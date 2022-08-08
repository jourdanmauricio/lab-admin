<script>
  import Category from "./Category/Category.svelte";
  import Properties from "./Properties.svelte";
  import Sku from "./Sku.svelte";
  import Title from "./Title.svelte";
  import { product } from "./../../store/stores.js";
  import AppSelection from "./AppSelection.svelte";

  export let application;
  export let setApplication;
</script>

<div
  name="appSelection"
  class="mt-6 flex flex-wrap justify-evenly border border-solid border-gray-900 rounded p-1"
>
  <AppSelection {application} {setApplication} />
</div>

<div class="mt-8 grid grid-cols-12 gap-8">
  <Title />
  <Sku />
  {#if $product.category}
    <Category />
  {/if}
</div>
{#if $product.category && $product.seller_custom_field}
  <Properties />
{/if}
