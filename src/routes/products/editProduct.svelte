<script>
  import { goto } from "$app/navigation";
  import { credentials, notification, product } from "./../../store/stores.js";
  import { onMount } from "svelte";
  import { getCategory } from "../../services/api/categories.js";
  import { serviceUpdProduct } from "../../services/api/products";
  import Tabs from "../../helpers/tabs/Tabs.svelte";
  import TabList from "../../helpers/tabs/TabList.svelte";
  import Tab from "../../helpers/tabs/Tab.svelte";
  import TabPanel from "../../helpers/tabs/TabPanel.svelte";
  import EditLocal from "../../lib/products/EditLocal.svelte";
  import EditMl from "../../lib/products/EditMl.svelte";

  let application = {
    ml: true,
    local: true,
    web: false,
  };

  onMount(async () => {
    if (!$product.action) goto("/products");
    let category = await getCategory($product.category_id);
    product.update({ category: category });
  });

  function cancel() {
    goto("/products");
  }

  function setApplication(e) {
    application[e.target.id] = e.target.checked;
  }

  async function updateProd() {
    let body = {};
    let mlBody = {};
    let mlLocalBody = {};
    let mlBodyDesc = {};
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
          mlLocalBody.attributes = attributes;
          break;
        case "available_quantity":
          body.available_quantity = parseInt($product.available_quantity);
          if (application.ml === true)
            mlBody.available_quantity = parseInt($product.available_quantity);
          break;
        case "available_quantity_ml":
          mlBody.available_quantity = parseInt($product.available_quantity_ml);
          break;
        case "condition":
          mlLocalBody.condition = $product.condition;
          break;
        case "description":
          mlBodyDesc = { plain_text: $product.description };
          break;
        case "listing_type_id":
          mlLocalBody.listing_type_id = $product.listing_type_id;
          break;
        case "price":
          let variations3 = [];
          body.price = $product.price;
          if (application.ml === true) {
            let percent = $credentials.settings.price_percent_ml;
            let price = $product.price + ($product.price * percent) / 100;
            mlBody.price = price;
            if ($product.variations.length > 0) {
              $product.variations.forEach((vari) => {
                variations3.push({ id: vari.id, price: price });
              });
              mlBody.variations = variations3;
              delete mlBody.price;
            }
          }
          break;
        case "pictures":
          mlBody.pictures = $product.pictures.map((el) => {
            return {
              id: el.id,
            };
          });
          break;
        case "price_ml":
          let mlVariations = [];
          mlBody.price = $product.price_ml;
          if ($product.variations.length > 0) {
            $product.variations.forEach((vari) => {
              mlVariations.push({ id: vari.id, price: $product.price_ml });
            });
            mlBody.variations = mlVariations;
            delete mlBody.price;
          }
          break;
        case "seller_custom_field":
          let sku = {
            id: "SKU",
            value_name: $product.seller_custom_field,
          };
          let newData = $product.attributes.map((el) =>
            el.id === sku.id ? sku : el
          );
          mlLocalBody.attributes = newData;
          mlLocalBody.seller_custom_field = $product.seller_custom_field;
          break;
        case "sale_terms":
          mlLocalBody.sale_terms = $product.sale_terms;
          break;
        case "status":
          body.status = $product.status;
          if (application.ml === true) mlBody.status = $product.status;
          break;
        case "status_ml":
          mlBody.status = $product.status_ml;
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
              delete vari.sold_quantity;
              delete vari.updated;
            }
            variations.push(vari);
          });
          mlLocalBody.variations = variations;
          break;
        default:
          break;
      }
    });

    try {
      if (Object.keys(mlLocalBody).length > 0) {
        await serviceUpdProduct(mlLocalBody, "ML-LOCAL", "PRODUCT");
      }
      if (Object.keys(mlBodyDesc).length > 0) {
        await serviceUpdProduct(mlBodyDesc, "ML-LOCAL", "DESCRIPTION");
      }
      if (Object.keys(body).length > 0) {
        await serviceUpdProduct(body, "LOCAL", "PRODUCT");
      }
      if (Object.keys(mlBody).length > 0) {
        await serviceUpdProduct(mlBody, "ML", "PRODUCT");
      }
      notification.show("Producto modificado", "success");
      goto("/products");
    } catch (error) {
      console.log("ERRORRRRR", error);
      notification.show(error, "error");
    }
  }
</script>

<div class=" flex flex-col min-h-full">
  <div class="flex-grow relative">
    <Tabs>
      <TabList>
        <Tab>Local</Tab>
        <Tab>ML</Tab>
        <Tab>Web</Tab>
      </TabList>

      <TabPanel>
        <EditLocal {application} {setApplication} />
      </TabPanel>
      <TabPanel>
        <EditMl />
      </TabPanel>
      <TabPanel>Web</TabPanel>
    </Tabs>
  </div>
  {#each Object.entries($product) as [key, value]}
    {#if key === "properties"}
      <p>{key} - {JSON.stringify(value)}</p>
    {/if}
  {/each}
  <div class="mt-4 mb-6 flex justify-end">
    <button on:click={cancel} class="btn ripple">Cancelar</button>
    <button on:click={updateProd} class="ml-10 btn ripple">Modificar</button>
  </div>
</div>
