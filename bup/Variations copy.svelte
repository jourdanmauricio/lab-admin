<script>
  import { product } from "./../../store/stores.js";
  import VariationsTable from "./VariationsTable.svelte";
  import VaritationsCombinations from "./VaritationsCombinations.svelte";
  import VariationsHeader from "./VariationsHeader.svelte";
  import { onMount } from "svelte";

  $: categoryVariations = $product.category.attributes.filter((attribute) =>
    attribute.tags.hasOwnProperty("allow_variations")
  );

  // $: categoryVariations = () => {
  //   let atribs = $product.category.attributes.filter((attribute) =>
  //     attribute.tags.hasOwnProperty("allow_variations")
  //   );

  //   if ($product.variations.length > 0) {
  //     $product.variations[0].attribute_combinations.forEach((atrib) => {
  //       let index = atribs.findIndex((atrib2) => atrib2.id === atrib.id);
  //       console.log("index", index);
  //       if (index === -1) {
  //         delete atrib.values;
  //         atribs.push(atrib);
  //       }
  //     });
  //   }
  //   console.log("atribs", atribs);
  //   return atribs;
  // };

  function addCustomAttribute(attribute) {
    const newAttribute = {
      id: attribute.toUpperCase(),
      name: attribute,
      tags: { custom: true },
    };
    categoryVariations = [...categoryVariations, newAttribute];
  }

  function removeCustomAttribute() {
    categoryVariations = categoryVariations.filter(
      (categoryVariation) => !categoryVariation.tags.hasOwnProperty("custom")
    );
    categoryVariations = categoryVariations;
  }

  onMount(() => {
    console.log("mount variation");
  });
</script>

{#if categoryVariations}
  <div class="mt-4 ml-auto mr-auto max-w-lg bg-white shadow-lg rounded-b-lg">
    <VariationsHeader
      {categoryVariations}
      {addCustomAttribute}
      {removeCustomAttribute}
    />
    <VaritationsCombinations {categoryVariations} />
  </div>
  <VariationsTable />
{/if}

<!-- categoryVariations
{#each Object.entries($product.variations) as [key, value]}
  <p>{key} - {JSON.stringify(value)}</p>
{/each} -->

categoryVariation!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
{#each Object.entries(categoryVariations) as [key, value]}
  <p>{key} - {JSON.stringify(value)}</p>
{/each}
