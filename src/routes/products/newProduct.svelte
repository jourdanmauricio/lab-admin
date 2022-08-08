<script>
  import { product, credentials } from "./../../store/stores.js";
  import Properties from "./../../lib/products/Properties.svelte";
  import Category from "../../lib/products/Category/Category.svelte";
  import Title from "./../../lib/products/Title.svelte";
  import Sku from "../../lib/products/Sku.svelte";
  import { onMount } from "svelte";
  import { postMlProduct } from "../../services/api/products.js";

  onMount(() => {
    product.setProduct({
      action: "new",
      category_id: "",
      category: {},
      currency_id: "ARS",
      condition: $credentials.settings.condition,
      pictures: [],
      listing_type_id: $credentials.settings.listing_type_id,
      sale_terms: [],
      site_id: "MLA",
      status: $credentials.settings.status,
      variations: [],
    });
    // product.update({ action: "new" });
  });

  function cancel() {
    goto("/products");
    product.setProduct({});
  }

  async function CreateProd() {
    try {
      let attributes = [];
      let newProduc = Object.assign({}, $product);
      delete newProduc.action;
      delete newProduc.category;
      newProduc.variations.map((vari) => {
        delete vari.id;
        vari.price = newProduc.price;
        return vari;
      });
      newProduc.attributes.map((attribute) => {
        if (attribute.updated) {
          let atrib = {
            id: attribute.id,
            value_id: attribute.value_id,
            value_name: attribute.value_name,
          };
          attributes.push(atrib);
        }
      });
      newProduc.attributes = attributes;

      const res = await postMlProduct(newProduc);
      console.log("res", res);
    } catch (error) {
      console.log("ERRRROR CREATE", error);
    }
  }
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
  <div class="mt-4 mb-6 flex justify-end">
    <button on:click={cancel} class="btn ripple">Cancelar</button>
    <button on:click={CreateProd} class="ml-10 btn ripple">Crear</button>
  </div>
</div>
