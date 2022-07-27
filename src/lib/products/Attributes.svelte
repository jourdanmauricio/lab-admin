<script>
  import { product } from "../../store/stores";

  $: attributes = $product.category.attributes.filter((attribute) => {
    if (
      !attribute.tags.hasOwnProperty("hidden") &&
      !attribute.tags.hasOwnProperty("allow_variations") &&
      !attribute.tags.hasOwnProperty("variation_attribute")
    ) {
      let found = $product.attributes.find(
        (atrib) => atrib.id === attribute.id
      );
      if (found) {
        // if (found.value_id === "-1" && found.value_name === null) {
        //   attribute.value_name = "N / A";
        // } else {
        attribute.value_id = found.value_id;
        attribute.value_name = found.value_name;
        // }
        if (
          found.value_name &&
          (attribute.value_type === "number_unit" ||
            attribute.value_type === "number")
        ) {
          let values = found.value_name.split(" ");
          attribute.value_name2 = values[0];
          attribute.value_unit = values[1];
        }
        if (attribute.tags.hasOwnProperty("multivalued") && found.value_name) {
          attribute.selected = found.value_name.split(",");
        }
      }
      return attribute;
    }
  });

  function handleChange2(attribute, e, type = "") {
    console.log("No Aplica");
    attribute.value_id = -1;
    attribute.value_name = null;
    let newData = attributes.map((el) =>
      el.id === attribute.id ? attribute : el
    );

    product.update({ attributes: newData });
  }

  function handleChange(attribute, e, type = "") {
    attribute.updated = true;
    if (type === "units") {
      attribute.value_name = attribute.value_name + " " + e.target.value;
    } else {
      attribute.value_name = e.target.value;
    }

    if (attribute.tags.hasOwnProperty("multivalued")) {
      attribute.value_name = "";
      Array.prototype.forEach.call(e.target.options, function (option) {
        if (option.selected)
          attribute.value_name = attribute.value_name + "," + option.text;
      });
    }

    let newData = attributes.map((el) =>
      el.id === attribute.id ? attribute : el
    );

    product.update({ attributes: newData });
  }
</script>

<table class="mt-4 responsive-table">
  <thead>
    <tr>
      <th>Atributo</th>
      <th>Valor</th>
      <th>Unidad</th>
      <th>Tags</th>
    </tr>
  </thead>
  <tbody>
    {#each attributes as attribute}
      {#if !attribute.tags.hasOwnProperty("hidden") && !attribute.tags.hasOwnProperty("defines_picture")}
        <tr>
          <td>{attribute.name}</td>
          <td>
            <div class="flex">
              {#if attribute.values && (attribute.value_type === "string" || attribute.value_type === "list")}
                {#if !attribute.tags.hasOwnProperty("multivalued")}
                  <input
                    on:change={(e) => handleChange(attribute, e)}
                    class="input-oval"
                    type="text"
                    id={attribute.id}
                    list={attribute.name}
                    value={attribute.value_name || ""}
                  />
                  <datalist id={attribute.name}>
                    {#each attribute.values as value}
                      <option data-id={value.id}>{value.name}</option>
                    {/each}
                  </datalist>
                {:else}
                  <select
                    on:change={(e) => handleChange(attribute, e)}
                    class="input-oval"
                    name={attribute.id}
                    id={attribute.id}
                    multiple={attribute.tags.hasOwnProperty("multivalued")}
                  >
                    <!-- value={attribute.selected} -->
                    {#each attribute.values as value}
                      <option
                        value={value.name}
                        selected={attribute.selected &&
                        attribute.selected.find((el) => el === value.name)
                          ? true
                          : false}
                      >
                        {value.name}</option
                      >
                    {/each}
                  </select>
                {/if}
              {/if}
              {#if attribute.values && attribute.value_type === "boolean"}
                <select
                  on:change={(e) => handleChange(attribute, e, "boolean")}
                  class="input-oval"
                  name={attribute.id}
                  id={attribute.id}
                  value={attribute.value_name || ""}
                >
                  <option selected value />
                  {#each attribute.values as value}
                    <option value={value.id}>{value.name}</option>
                  {/each}
                </select>
              {/if}
              {#if !attribute.hasOwnProperty("values") && attribute.value_type === "string"}
                <input
                  on:change={(e) => handleChange(attribute, e)}
                  class="input-oval"
                  type="text"
                  id={attribute.id}
                  name={attribute.id}
                  value={attribute.value_name === null &&
                  attribute.value_id === -1
                    ? "N / A"
                    : attribute.value_name}
                />
              {/if}
              {#if attribute.value_type === "number_unit" || attribute.value_type === "number"}
                <input
                  on:change={(e) => handleChange(attribute, e)}
                  id={attribute.id}
                  class="input-oval"
                  type="number"
                  name={attribute.id}
                  value={attribute.value_name2 || ""}
                />
              {/if}
              <button
                on:click={(e) => handleChange2(attribute, e)}
                class="ml-3 px-1 transition-all rounded-full text-sm hover:bg-gray-300"
                name="N/A">N/A</button
              >
            </div>
          </td>
          <td>
            {#if attribute.allowed_units}
              <select
                on:change={(e) => handleChange(attribute, e, "units")}
                class="input-oval"
                name={attribute.id}
                id={attribute.id}
                value={attribute.value_unit || ""}
              >
                <option selected value />
                {#each attribute.allowed_units as allowed_unit}
                  <option value={allowed_unit.id}>{allowed_unit.name}</option>
                {/each}
              </select>
            {/if}
          </td>
          <td
            >{#each Object.entries(attribute.tags) as [key, value]}
              <p>{key} - {value}</p>
            {/each}
          </td>
        </tr>
      {/if}
    {/each}
  </tbody>
</table>

Atributos
{#each Object.entries($product.attributes) as [key, value]}
  <p>{key} - {JSON.stringify(value)}</p>
{/each}
