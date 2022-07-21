<script>
  import { onMount } from "svelte";

  export let category;

  onMount(() => {
    console.log("category", category);
  });

  function handleChange(e) {
    console.log("change", e);
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
    {#each category.attributes as attribute}
      {#if !attribute.tags.hasOwnProperty("hidden") && !attribute.tags.hasOwnProperty("defines_picture")}
        <tr>
          <td>{attribute.name}</td>
          <td>
            {#if (attribute.values && attribute.value_type === "string") || attribute.value_type === "list"}
              <input
                on:change={handleChange}
                class="input-oval"
                type="text"
                list={attribute.name}
              />
              <datalist id={attribute.name}>
                {#each attribute.values as value}
                  <option data-id={value.id}>{value.name}</option>
                {/each}
              </datalist>
              <!-- <select class="input-oval" name="atribs" id="atribs">
                {#each attribute.values as value}
                  <option value={value.id}>{value.name}</option>
                {/each}
              </select> -->
            {/if}
            {#if attribute.values && attribute.value_type === "boolean"}
              <select class="input-oval" name={attribute.id} id={attribute.id}>
                <option selected value />
                {#each attribute.values as value}
                  <option value={value.id}>{value.name}</option>
                {/each}
              </select>
            {/if}
            {#if !attribute.hasOwnProperty("values") && attribute.value_type === "string"}
              <input class="input-oval" type="text" name={attribute.id} />
            {/if}
            {#if attribute.value_type === "number_unit" || attribute.value_type === "number"}
              <input class="input-oval" type="number" name={attribute.id} />
            {/if}
          </td>
          <td>
            {#if attribute.allowed_units}
              <select class="input-oval" name={attribute.id} id={attribute.id}>
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
