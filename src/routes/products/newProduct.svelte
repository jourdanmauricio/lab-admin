<script>
  import { product } from "./../../store/stores.js";
  import Properties from "./../../lib/products/Properties.svelte";
  import Category from "./../../lib/products/Category.svelte";
  import Title from "./../../lib/products/Title.svelte";
  import Sku from "../../lib/products/Sku.svelte";
  import { onMount } from "svelte";

  onMount(() => {
    product.update({ action: "new" });
  });
</script>

<div class="mt-2 container">
  <div class="grid grid-cols-12 gap-8">
    <Title />
    <Sku />
    <Category />
  </div>
  {#if $product.category_id.length > 0 && $product.seller_custom_field}
    <Properties />
  {/if}

  <br /><br />
  <hr />

  {#each Object.entries($product) as [key, value]}
    {#if key !== "category"}
      <p>{key} - {JSON.stringify(value)}</p>
    {/if}
  {/each}
</div>
