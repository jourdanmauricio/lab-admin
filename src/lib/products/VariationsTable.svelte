<script>
  import { product } from "./../../store/stores.js";
  export let categoryVariations;

  $: sku = (id) => {
    let sku = "";
    if ($product.variations) {
      let variation = $product.variations.find(
        (variation) => variation.id === id
      );
      if (variation.attributes) {
        let atribSku = variation.attributes.find((atrib) => atrib.id === "SKU");
        if (atribSku) sku = atribSku.value_name;
      }
    }
    return sku;
  };
</script>

<table class="mt-4 responsive-table">
  <thead>
    <th>Id</th>
    <th>Sku</th>
    {#each categoryVariations as categoryVariation}
      <th>{categoryVariation.name}</th>
    {/each}
    <th>Cantidad</th>
    <th>Acciones</th>
  </thead>
  <tbody>
    {#each $product.variations as variation}
      <tr>
        <td>{variation.id || ""}</td>
        <td
          ><input
            class="max-w-[100px] text-center border border-solid border-gray-400 rounded"
            type="text"
            value={sku(variation.id)}
          /></td
        >
        {#each variation.attribute_combinations as comb}
          <td>{comb.value_name}</td>
        {/each}

        <td
          ><input
            class="max-w-[45px] text-center border border-solid border-gray-400 rounded"
            type="number"
            min="0"
            value={variation.available_quantity}
          />
        </td>
        <td>
          <i class="material-icons text-purple-400">edit_attributes</i>
          <i class="material-icons text-teal-400">photo</i>
          <i class="material-icons text-red-400">delete</i></td
        >
      </tr>
    {/each}
    <tr />
  </tbody>
</table>

{#each Object.entries($product.variations) as [key, value]}
  <p>{key} - {JSON.stringify(value)}</p>
{/each}
