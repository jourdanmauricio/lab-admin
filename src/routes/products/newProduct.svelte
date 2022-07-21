<script>
  import { newProduct } from "./../../store/stores.js";
  import Properties from "./../../lib/products/Properties.svelte";
  import Category from "./../../lib/products/Category.svelte";
  import Title from "./../../lib/products/Title.svelte";
  import Sku from "../../lib/products/Sku.svelte";
  import { onMount } from "svelte";

  // let newProduct = { site_id: "MLA" };
  let category = {};

  function setProperty(value) {
    newProduct = { ...newProduct, ...value };
    console.log("newProduct", newProduct);
  }

  onMount(() => {
    // newProduct.setProduct();
  });
</script>

<div class="mt-2 container">
  <div class="grid grid-cols-12 gap-8">
    <Title />
    <Sku />
    <Category bind:category />
  </div>
  {#if $newProduct.category_id}
    <Properties {category} />
  {/if}

  {JSON.stringify($newProduct)}
  <!-- {#each Object.entries($newProduct) as [key, value]}
    <p>{key} - {value}</p>
  {/each} -->
</div>
