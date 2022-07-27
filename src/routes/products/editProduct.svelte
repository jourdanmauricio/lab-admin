<script>
  import AppSelection from "./../../lib/products/AppSelection.svelte";
  import { goto } from "$app/navigation";
  import { notification, product } from "./../../store/stores.js";
  import Properties from "./../../lib/products/Properties.svelte";
  import Category from "./../../lib/products/Category.svelte";
  import Title from "./../../lib/products/Title.svelte";
  import Sku from "../../lib/products/Sku.svelte";
  import { onMount } from "svelte";
  import { getCategory } from "../../services/api/categories.js";
  import { patchProduct } from "../../services/api/products";
  import { patchApiProductMl } from "../../services/api/productsMl";

  let application = {
    ml: true,
    local: true,
    web: false,
  };

  onMount(async () => {
    if (!$product.action) goto("/products");
    let category = await getCategory($product.category_id);
    product.update({ category: category });
    console.log("category", category);
  });

  function setApplication(e) {
    application[e.target.id] = e.target.checked;
  }

  async function updateProd() {
    console.log("update", $product.properties);
    let body = {};
    $product.properties.forEach((property) => {
      switch (property) {
        case "attributes":
          body.attributes = $product.attributes;
          break;
        case "available_quantity":
          body.available_quantity = parseInt($product.available_quantity);
          break;
        case "status":
          body.status = $product.status;
          break;
        case "price":
          body.price = $product.price;
          break;
        case "seller_custom_field":
          let sku = {
            id: "SKU",
            value_name: $product.seller_custom_field,
          };
          let newData = $product.attributes.map((el) =>
            el.id === sku.id ? sku : el
          );
          body.attributes = newData;
          body.seller_custom_field = $product.seller_custom_field;
          break;
        case "sale_terms":
          body.sale_terms = $product.sale_terms;
          break;
        case "condition":
          body.condition = $product.condition;
          break;
        case "listing_type_id":
          body.listing_type_id = $product.listing_type_id;
          break;
        default:
          break;
      }
    });

    if (application.ml) {
      body.id = $product.prodMl.id;
      try {
        console.log("Product", $product);
        const res = await patchApiProductMl([body]);
        console.log("res", res);
        notification.show("Producto modificado", "success");
        goto("/products");
      } catch (error) {
        notification.show(error, "error");
      }
    }

    if (application.local) {
      body.id = $product.id;
      try {
        const res = await patchProduct([body]);
        console.log("res", res);
        notification.show("Producto modificado", "success");
        goto("/products");
      } catch (error) {
        notification.show(error, "error");
      }
    }
  }
</script>

<div class="mt-8 flex flex-col min-h-full">
  <div class="flex-grow relative">
    <div
      name="appSelection"
      class="flex flex-wrap justify-evenly border border-solid border-gray-900 rounded p-1"
    >
      <AppSelection {application} {setApplication} />
    </div>
    <label
      class="pointer-events-none text-sm absolute left-2.5 -top-5"
      for="appSelection">Aplicar</label
    >
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
  </div>
  {#each Object.entries($product) as [key, value]}
    {#if key === "properties"}
      <p>{key} - {JSON.stringify(value)}</p>
    {/if}
  {/each}
  <div class="mt-4 flex justify-end">
    <button class="btn ripple">Cancelar</button>
    <button on:click={updateProd} class="ml-10 btn ripple">Modificar</button>
  </div>
</div>
