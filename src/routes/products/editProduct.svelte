<script>
  import Description from "./../../lib/products/Description.svelte";
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
  import {
    patchApiDescriptionMl,
    patchApiProductMl,
    patchProductsMl,
  } from "../../services/api/productsMl";

  let application = {
    ml: true,
    local: false,
    web: false,
  };

  onMount(async () => {
    if (!$product.action) goto("/products");
    let category = await getCategory($product.category_id);
    product.update({ category: category });
  });

  function setApplication(e) {
    application[e.target.id] = e.target.checked;
  }

  async function updateProd() {
    let body = {};
    let bodyDesc = {};
    console.log("$product", $product);
    $product.properties.forEach((property) => {
      switch (property) {
        case "attributes":
          let attributes = [];
          $product.attributes.map((attribute) => {
            let atrib = {
              id: attribute.id,
            };
            if (attribute.updated) {
              atrib.value_id = attribute.value_id;
              atrib.value_name = attribute.value_name;
            }
            attributes.push(atrib);
          });
          body.attributes = attributes;
          break;
        case "available_quantity":
          body.available_quantity = parseInt($product.available_quantity);
          break;
        case "condition":
          body.condition = $product.condition;
          break;
        case "description":
          bodyDesc = { plain_text: $product.description };
          break;
        case "listing_type_id":
          body.listing_type_id = $product.listing_type_id;
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
        case "status":
          body.status = $product.status;
          break;
        case "variations":
          let variations = [];
          $product.variations.map((variation) => {
            let vari = {
              id: variation.id,
            };
            if (variation.updated === true) {
              vari = Object.assign({}, variation);
              vari.attributes = [];
              variation.attributes.forEach((atrib) => {
                vari.attributes.push({
                  id: atrib.id,
                  name: atrib.name,
                  value_id: atrib.value_id ? atrib.value_id : "",
                  value_name: atrib.value_name ? atrib.value_name : "",
                });
              });

              let sku = variation.attributes.find(
                (atrib) => atrib.id === "SELLER_SKU"
              );

              if (sku && sku.value_name === variation.id) delete vari.id;

              delete vari.catalog_product_id;
              delete vari.inventory_id;
              delete vari.item_relations;
              delete vari.sale_terms;
              delete vari.seller_custom_field;
              delete vari.updated;
            }
            variations.push(vari);
          });
          body.variations = variations;
          break;
        default:
          break;
      }
    });

    try {
      if (application.ml) {
        if (Object.keys(body).length > 0) {
          body.id = $product.prodMl.id;
          const resApi = await patchApiProductMl([body]);
          resApi[0].prod_id = $product.id;
          const resMl = await patchProductsMl(resApi);
          resApi[0].id = $product.id;
          // resApi[0].mlId = $product.prodMl.id;
          delete resApi[0].status;
          delete resApi[0].available_quantity;
          delete resApi[0].price;
          delete resApi[0].sold_quantity;
          delete resApi[0].start_time;
          console.log("resApi", resApi[0]);
          await patchProduct(resApi);
        }

        if (Object.keys(bodyDesc).length > 0) {
          bodyDesc.id = $product.prodMl.id;
          const descriptionMl = await patchApiDescriptionMl([bodyDesc]);
          const description = {
            id: $product.id,
            description: descriptionMl[0].plain_text,
          };
          await patchProduct([description]);
        }
      }
      if (application.local) {
        body.id = $product.id;
        const res = await patchProduct([body]);
        console.log("res", res);
      }
      notification.show("Producto modificado", "success");
      goto("/products");
    } catch (error) {
      notification.show(error, "error");
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
  <div class="mt-4 mb-6 flex justify-end">
    <button class="btn ripple">Cancelar</button>
    <button on:click={updateProd} class="ml-10 btn ripple">Modificar</button>
  </div>
</div>
