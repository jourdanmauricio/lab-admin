<script>
  import VariationsTable from "./VariationsTable.svelte";
  import { product } from "./../../store/stores.js";
  import VaritationsCombinations from "./VaritationsCombinations.svelte";
  import VariationsHeader from "./VariationsHeader.svelte";

  $: categoryVariations = $product.category.attributes.filter((attribute) =>
    attribute.tags.hasOwnProperty("allow_variations")
  );

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

  <VariationsTable {categoryVariations} />
{/if}
