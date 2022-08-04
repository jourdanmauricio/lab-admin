<script>
  import { product } from "./../../store/stores.js";
  export let variation_id;

  $: attribs = $product.category.attributes.filter(
    (attribute) =>
      // attribute.tags.hasOwnProperty("hidden") &&
      !attribute.tags.hasOwnProperty("allow_variations") &&
      attribute.tags.hasOwnProperty("variation_attribute") &&
      !attribute.tags.hasOwnProperty("read_only")
  );

  $: currentVariation = $product.variations.find(
    (variation) => variation.id === variation_id
  );

  $: attributes = attribs.map((atrib) => {
    if (!currentVariation.attributes) currentVariation.attributes = [];
    let found = currentVariation.attributes.find((el) => el.id === atrib.id);
    if (found) {
      found.value_type = atrib.value_type;
      found.name = atrib.name;
      found.tags = atrib.tags;
      found.values = atrib.values;
      found.allowed_units = atrib.allowed_units;
      return found;
    } else {
      return atrib;
    }
  });

  function handleNA(attribute) {
    let newAttribute = Object.assign({}, attribute);
    newAttribute.updated = true;
    if (newAttribute.value_id === "-1" && newAttribute.value_name === null) {
      newAttribute.value_id = "";
      newAttribute.value_name = "";
    } else {
      newAttribute.value_id = "-1";
      newAttribute.value_name = null;
    }

    let variation = Object.assign({}, currentVariation);
    let found = currentVariation.attributes.findIndex(
      (atrib) => atrib.id === newAttribute.id
    );
    if (found === -1)
      currentVariation.attributes = [
        ...currentVariation.attributes,
        newAttribute,
      ];

    variation.attributes = currentVariation.attributes.map((el) => {
      return el.id === newAttribute.id ? newAttribute : el;
    });
    variation.updated = true;

    let newData = $product.variations.map((el) => {
      return el.id === variation.id ? variation : el;
    });

    product.update({ variations: newData });
  }

  function handleChange(attribute, e, type = "") {
    let newAttribute = Object.assign({}, attribute);
    newAttribute.updated = true;
    switch (type) {
      case "boolean":
        newAttribute.value_id = e.target.value;
        newAttribute.value_name = Array.from(
          e.target.selectedOptions
        )[0].innerHTML;
        break;
      case "string":
        if (!attribute.values) {
          newAttribute.value_id = "";
          newAttribute.value_name = e.target.value;
        } else {
          if (attribute.tags.multivalued) {
            let selected = Array.from(e.target.selectedOptions);
            let values = "";
            selected.forEach(
              (el) =>
                (newAttribute.value_name =
                  values.length === 0
                    ? (values = el.value)
                    : newAttribute.value_name + "," + el.value)
            );
          } else {
            let found = attribute.values.find(
              (atrib) => atrib.name === e.target.value
            );
            newAttribute.value_name = found.name;
            newAttribute.value_id = found.id;
          }
        }
        break;
      case "list":
        let found = attribute.values.find(
          (atrib) => atrib.name === e.target.value
        );
        newAttribute.value_name = found.name;
        newAttribute.value_id = found.id;
        break;
      case "number_unit":
        newAttribute.value_id = "";
        if (!newAttribute.hasOwnProperty("value_struct"))
          newAttribute.value_struct = { unit: "", number: "" };
        newAttribute.value_struct.number = e.target.value;

        newAttribute.value_name = attribute.value_unit
          ? e.target.value + " " + attribute.value_unit
          : e.target.value;
        break;
      case "units":
        if (newAttribute.value_name) {
          newAttribute.value_name = attribute.value_name + " " + e.target.value;
        } else {
          newAttribute.value_name = e.target.value;
        }
        if (!newAttribute.hasOwnProperty("value_struct"))
          newAttribute.value_struct = { unit: "", number: "" };
        newAttribute.value_struct.unit = e.target.value;
        break;
      default:
        newAttribute.value_name = e.target.value;
        break;
    }

    let variation = Object.assign({}, currentVariation);
    let found = currentVariation.attributes.findIndex(
      (atrib) => atrib.id === newAttribute.id
    );

    if (found === -1)
      currentVariation.attributes = [
        ...currentVariation.attributes,
        newAttribute,
      ];

    variation.attributes = currentVariation.attributes.map((el) => {
      return el.id === newAttribute.id ? newAttribute : el;
    });
    variation.updated = true;

    let newData = $product.variations.map((el) => {
      return el.id === variation.id ? variation : el;
    });

    product.update({ variations: newData });
  }
</script>

<h2 class="text-xl text-center">
  Atributos de variación - {currentVariation.id}
</h2>
<div class="py-4">
  <div class="w-full border-t border-gray-900" />
</div>

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
      <tr>
        <td>{attribute.name} </td>
        <td>
          <div class="flex">
            {#if attribute.value_id === "-1" && attribute.value_name === null}
              <button
                on:click={(e) => handleNA(attribute)}
                class="p-2 mx-auto transition-all rounded-full text-sm hover:bg-gray-300"
                name="N/A">N/A</button
              >
            {:else}
              {#if attribute.values && (attribute.value_type === "string" || attribute.value_type === "list")}
                {#if !attribute.tags.hasOwnProperty("multivalued")}
                  <input
                    on:change={(e) =>
                      handleChange(attribute, e, attribute.value_type)}
                    class="input-oval"
                    type="text"
                    id={attribute.id}
                    list={attribute.name}
                    value={attribute.value_name}
                  />
                  <datalist id={attribute.name}>
                    {#each attribute.values as value}
                      <option>{value.name}</option>
                    {/each}
                  </datalist>
                {:else}
                  <select
                    on:change={(e) =>
                      handleChange(attribute, e, attribute.value_type)}
                    class="input-oval"
                    name={attribute.id}
                    id={attribute.id}
                    multiple={attribute.tags &&
                      attribute.tags.hasOwnProperty("multivalued")}
                  >
                    {#each attribute.values as value}
                      <option
                        value={value.name}
                        selected={attribute.value_name &&
                        attribute.value_name.includes(value.name)
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
                  on:change={(e) =>
                    handleChange(attribute, e, attribute.value_type)}
                  class="input-oval"
                  name={attribute.id}
                  id={attribute.id}
                  value={attribute.value_id}
                >
                  <option selected value />
                  {#each attribute.values as value}
                    <option value={value.id}>{value.name}</option>
                  {/each}
                </select>
              {/if}
              {#if !attribute.values && attribute.value_type === "string"}
                <input
                  on:change={(e) =>
                    handleChange(attribute, e, attribute.value_type)}
                  class="input-oval"
                  type="text"
                  id={attribute.id}
                  name={attribute.id}
                  value={attribute.value_name || ""}
                />
              {/if}
              {#if attribute.value_type === "number"}
                <input
                  on:change={(e) =>
                    handleChange(attribute, e, attribute.value_type)}
                  id={attribute.id}
                  class="input-oval"
                  type="number"
                  name={attribute.id}
                  value={attribute.value_name}
                />
              {/if}

              {#if attribute.value_type === "number_unit"}
                <input
                  on:change={(e) =>
                    handleChange(attribute, e, attribute.value_type)}
                  id={attribute.id}
                  class="input-oval"
                  type="number"
                  name={attribute.id}
                  value={attribute.value_struct
                    ? attribute.value_struct.number
                    : ""}
                />
              {/if}
              {#if !attribute.tags.hasOwnProperty("required") && !attribute.tags.hasOwnProperty("catalog_required")}
                <button
                  on:click={(e) => handleNA(attribute)}
                  class="w-[35px;] ml-3 px-1 transition-all rounded-full text-sm hover:bg-gray-300"
                  name="N/A">N/A</button
                >
              {:else}
                <div class="w-[50px;]" />
              {/if}
            {/if}
          </div>
        </td>
        <td>
          {#if attribute.allowed_units}
            <select
              on:change={(e) => handleChange(attribute, e, "units")}
              class="input-oval"
              name={attribute.id}
              id={attribute.id}
              value={attribute.value_struct ? attribute.value_struct.unit : ""}
            >
              <option selected value />
              {#each attribute.allowed_units as allowed_unit}
                <option value={allowed_unit.id}>{allowed_unit.name}</option>
              {/each}
            </select>
          {/if}
        </td>
        <td>
          {#if attribute.tags}
            {#each Object.entries(attribute.tags) as [key, value]}
              <p>{key} - {value}</p>
            {/each}
          {/if}
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<!-- {#each Object.entries(attribs) as [key, value]}
  <p>{key} - {JSON.stringify(value)}</p>
{/each} -->

{#each Object.entries(attributes) as [key, value]}
  <p>{key} - {JSON.stringify(value)}</p>
{/each}
