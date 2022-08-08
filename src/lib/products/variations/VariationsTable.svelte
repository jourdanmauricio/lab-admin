<script>
  import VariationsAttributes from "./VariationsAttributes.svelte";
  import VariationPictures from "./VariationPictures.svelte";
  import Modal2 from "../../Modal2.svelte";
  import { product } from "../../../store/stores.js";

  let modalShowAttributes;
  let modalShowPictures;
  let currentVariation;

  $: atribProdVariations =
    $product.variations.length > 0
      ? $product.variations[0].attribute_combinations.map(
          (attribute) => attribute
        )
      : [];

  $: sku = (id) => {
    let sku = "";
    if ($product.variations) {
      let variation = $product.variations.find(
        (variation) => variation.id === id
      );
      if (variation.attributes) {
        let atribSku = variation.attributes.find(
          (atrib) => atrib.id === "SELLER_SKU"
        );
        if (atribSku) sku = atribSku.value_name;
      }
    }
    return sku;
  };

  function deleteVariation(variation) {
    const newVariations = $product.variations.filter(
      (vari) => vari.id !== variation.id
    );
    product.update({ variations: newVariations });
  }

  function variationAttributes(variation) {
    currentVariation = variation;
    modalShowAttributes.show();
  }

  function variationPictures(variation) {
    currentVariation = variation;
    modalShowPictures.show();
  }

  function updateQuantity(value, variation) {
    variation.available_quantity = value;
    variation.updated = true;
    let newData = $product.variations.map((el) => {
      return el.id === variation.id ? variation : el;
    });
    product.update({ variations: newData });
  }

  function updateSku(value, variation) {
    if (!variation.attributes) variation.attributes = [];
    let sku = variation.attributes.find((vari) => vari.id === "SELLER_SKU");
    if (sku) {
      sku.value_name = value;
    } else {
      variation.attributes.push({
        id: "SELLER_SKU",
        value_name: value,
      });
    }
    variation.updated = true;
    let newData = $product.variations.map((el) => {
      return el.id === variation.id ? variation : el;
    });
    product.update({ variations: newData });
  }
</script>

<table class="mt-4 responsive-table">
  <thead>
    <th>Id</th>
    <th>Sku</th>
    {#each atribProdVariations as categoryVariation}
      <th>{categoryVariation.name} </th>
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
            on:change={(e) => updateSku(e.target.value, variation)}
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
            on:change={(e) => updateQuantity(e.target.value, variation)}
            class="max-w-[45px] text-center border border-solid border-gray-400 rounded"
            type="number"
            min="0"
            value={variation.available_quantity}
          />
        </td>
        <td>
          <button on:click={variationAttributes(variation)}>
            <i class="btn-rounded material-icons text-purple-400"
              >edit_attributes</i
            >
          </button>
          <button on:click={variationPictures(variation)}>
            <i class="btn-rounded material-icons text-teal-400">photo</i>
          </button>
          <button on:click={deleteVariation(variation)}>
            <i class="btn-rounded material-icons text-red-400">delete</i>
          </button>
        </td>
      </tr>
    {/each}
    <tr />
  </tbody>
</table>

<Modal2 width="w-11/12 lg:w-3/4" bind:this={modalShowAttributes}>
  <VariationsAttributes variation_id={currentVariation.id} />
</Modal2>

<Modal2 width="w-11/12 lg:w-3/4" bind:this={modalShowPictures}>
  <VariationPictures variation_id={currentVariation.id} />
</Modal2>

{#each Object.entries($product.variations) as [key, value]}
  <p>{key} - {JSON.stringify(value)}</p>
{/each}
