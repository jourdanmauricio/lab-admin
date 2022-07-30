<script>
  export let currentCat;
</script>

<div class="mb-6">
  <h2 class="text-lg text-center">
    Categoría {currentCat.id} - {currentCat.full_name}
  </h2>

  <table class="responsive-table">
    <thead>
      <th>Atributo</th>
      <th>Etiquetas</th>
      <th>Tipo</th>
      <th>Values</th>
    </thead>
    <tbody>
      {#each currentCat.attributes as attribute}
        <tr>
          <td>{attribute.name}</td>
          <td>
            {#if attribute.tags}
              {#each Object.entries(attribute.tags) as [key, value]}
                <p>{key} - {value}</p>
              {/each}
            {/if}
          </td>
          <td>{attribute.value_type}</td>
          <td class="max-w-md">
            {#if attribute.values}
              {#each attribute.values as value, index}
                {#if index === 0}
                  {`${value.name}`}
                {:else}
                  {` - ${value.name}`}
                {/if}
              {/each}
            {/if}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>

  <div class="mt-6 grid-responsive">
    {#each Object.entries(currentCat.settings) as [key, value]}
      <div class="p-2 bg-gray-300 rounded border border-solid border-gray-800">
        <p>{key} - {JSON.stringify(value)}</p>
      </div>
    {/each}
  </div>
</div>

<style>
  .grid-responsive {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1vw 1vw;
  }
</style>
