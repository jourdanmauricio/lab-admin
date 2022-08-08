<script>
  import { product } from "../../../store/stores.js";
  import VariationsTable from "./VariationsTable.svelte";
  import VaritationsCombinations from "./VaritationsCombinations.svelte";

  $: categoryVariations = $product.category.attributes.filter((attribute) =>
    attribute.tags.hasOwnProperty("allow_variations")
  );
</script>

{#if categoryVariations}
  <div class="mt-4 ml-auto mr-auto max-w-lg bg-white shadow-lg rounded-b-lg">
    <VaritationsCombinations />
  </div>
  <VariationsTable />
{/if}
