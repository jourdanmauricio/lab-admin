<script>
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";
  import { traduction } from "../../helpers/traduction";
  import { getCategory } from "../../services/api/categories";

  export let currentProd;

  let category;

  function varPicture(id) {
    let found = currentProd.pictures.find((prodPic) => prodPic.id === id);
    return found.secure_url;
  }

  function headerVariation(variation) {
    let header = variation.id;
    variation.attribute_combinations.forEach((comb, index) => {
      if (index === 0) {
        header += ` - ${comb.name} ${comb.value_name}`;
      } else {
        header += `/${comb.name} ${comb.value_name}`;
      }
    });
    header += ` - Cantidad ${variation.available_quantity}`;
    return header;
    // let sku = variation.attributes.find((atrib) => atrib.id === "SELLER_SKU");
    // if (sku) header += ` - SKU ${sku.value_name}`;
  }

  onMount(async () => {
    category = await getCategory(currentProd.category_id);
  });
</script>

<h2 class="text-xl text-center">
  Detalle producto - {currentProd.title}
</h2>
<div class="py-4">
  <div class="w-full border-t border-gray-900" />
</div>

<!-- Comparativa -->
<table class="responsive-table">
  <thead>
    <th>ML</th>
    <th>Local</th>
    <th>Web</th>
  </thead>
  <tbody>
    <td>
      {#if currentProd.prodMl}
        {currentProd.prodMl.id} <br />
        {traduction(currentProd.prodMl.status)} <br />
        ${currentProd.prodMl.price} <br />
        {currentProd.prodMl.available_quantity} u
      {/if}
    </td>
    <td>
      {currentProd.id} <br />
      {traduction(currentProd.status)} <br />
      ${currentProd.price} <br />
      {currentProd.available_quantity} u
    </td>
    <td>Web</td>
  </tbody>
</table>

<!-- Categoría -->
<div class="mt-4">
  Categoría: {currentProd.category_id}
  {#if category}
    {category.full_name}
  {/if}
</div>

<!-- Imagenes del producto -->
{#if currentProd.variations.length === 0}
  <h3 class="mt-4 text-xl text-center">Imágenes del producto</h3>
  <div class="flex flex-wrap m-2 rounded shadow-2xl py-0 px-4 bg-white">
    {#each currentProd.pictures as picture, index (picture.id)}
      <div
        class="flex flex-wrap w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 item"
        id={picture.id}
      >
        <div class="flex justify-center items-start relative w-full p-4 m-2">
          <img
            ondragstart="return false;"
            ondrop="return false;"
            alt="gallery"
            class="block object-cover object-center max-w-[100px] sm:max-w-[150px] w-full h-full border border-solid border-secondaryColor rounded "
            src={picture.secure_url}
          />
        </div>
      </div>
    {/each}
  </div>
{/if}

<!-- Variaciones -->
{#if currentProd.variations.length > 0}
  {#each currentProd.variations as variation}
    <button
      class:active={variation.open}
      on:click={() => (variation.open = !variation.open)}
      class=" mt-4 flex justify-between text-gray-700 cursor-pointer p-2 w-full text-left border-none outline-none rounded hover:bg-gray-400 {variation.open
        ? 'bg-gray-400'
        : 'bg-gray-100'}"
    >
      <span>
        {headerVariation(variation)}
      </span>
      <i class="material-icons"
        >{variation.open ? "expand_less" : "expand_more"}</i
      >
    </button>
    {#if variation.open === true}
      <h3 class="mt-4 text-xl text-center">Imágenes de la variación</h3>
      <div
        transition:slide|local
        class="flex flex-wrap m-2 rounded shadow-2xl py-0 px-4 bg-white"
      >
        <div class="flex flex-wrap m-2 rounded shadow-2xl py-0 px-4 bg-white">
          {#each variation.picture_ids as picture, index (picture)}
            <div class="flex flex-wrap w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 item">
              <div
                class="flex justify-center items-start relative w-full p-4 m-2"
              >
                <img
                  ondragstart="return false;"
                  ondrop="return false;"
                  alt="gallery"
                  class="block object-cover object-center max-w-[100px] sm:max-w-[150px] w-full h-full border border-solid border-secondaryColor rounded "
                  src={varPicture(picture)}
                />
              </div>
            </div>
          {/each}
        </div>
        {#if variation.attributes}
          <h3 class="mt-4 mx-auto text-xl">Atributos de la variación</h3>
          <table class="responsive-table">
            <thead>
              <th>Atributo</th>
              <th>Valor</th>
            </thead>
            <tbody>
              {#each variation.attributes as attribute}
                <tr>
                  <td>{attribute.name}</td>
                  <td>{attribute.value_name}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        {/if}
      </div>
    {/if}
  {/each}
{/if}

<!-- Sale_terms -->

{#if currentProd.sale_terms.length > 0}
  <h3 class="mt-4 text-xl text-center">Condiciones</h3>
  <div class="flex flex-wrap mt-4 rounded shadow-2xl py-0 px-4 bg-white">
    {#each currentProd.sale_terms as term}
      {traduction(term.id)} {term.value_name} <br />
    {/each}
  </div>
{/if}
