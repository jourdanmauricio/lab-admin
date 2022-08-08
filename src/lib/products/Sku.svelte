<script>
  import { tick, onMount } from "svelte";
  import { getLocalSkus } from "../../services/api/products";
  import { credentials, notification, product } from "../../store/stores";

  let arraySkus2 = [];
  let prodSkus = [];

  $: seller_custom_field = $product.seller_custom_field || "";

  function handleChange(e) {
    // Validación
    let index = false;
    if ($product.action === "edit") {
      index = prodSkus.findIndex(
        (el) =>
          el.seller_custom_field === e.target.value && el.id !== $product.id
      );
    } else {
      index = prodSkus.findIndex(
        (el) => el.seller_custom_field === e.target.value
      );
    }
    if (index !== -1) {
      notification.show("El Sku pertnece a otro item", "error");
      e.target.select();
      return;
    }

    $credentials.settings.hintSku === true
      ? updateSku(e)
      : product.update({ seller_custom_field: e.target.value });
  }

  function updateSku(e) {
    // Actualizo item y variaciones
    product.update({ seller_custom_field: e.target.value });
    if ($product.variations.length > 0) {
      let newVariations = [];
      let sku = 1;
      $product.variations.forEach((variation) => {
        let vari = Object.assign({}, variation);
        if (!vari.attributes) vari.attributes = [];
        let found = vari.attributes.find((atrib) => atrib.id === "SELLER_SKU");
        if (found) {
          found.value_name = `${$product.seller_custom_field}--${sku}`;
        } else {
          vari.attributes.push({
            id: "SELLER_SKU",
            value_name: `${$product.seller_custom_field}--${sku}`,
          });
        }
        vari.updated = true;
        newVariations.push(vari);
        sku += 1;
      });
      product.update({ variations: newVariations });
    }
  }

  onMount(async () => {
    await tick();
    let sigla;
    let siglas = [];
    let arraySkus = [];
    prodSkus = await getLocalSkus();
    arraySkus = prodSkus.map((el) => el.seller_custom_field);

    arraySkus.forEach((sku) => {
      if (sku !== null) {
        sigla = sku.slice(0, sku.indexOf("-", 0));
        siglas.push(...sigla.match(/[a-zA-Z]+/g));
      }
    });
    siglas = siglas.filter(
      (valor, indiceActual, arreglo) => arreglo.indexOf(valor) === indiceActual
    );
    let sku = 1;
    siglas.forEach((sigla) => {
      let founds = arraySkus.filter(
        (arraySku) =>
          arraySku !== null && arraySku.match(/[a-zA-Z]+/g)[0] === sigla
      );
      let itemSkus = founds.map((itemSku) => itemSku.match(/\d+/g));
      sku = Math.max(...itemSkus) + 1;
      arraySkus2.push(sigla + sku);
      sku = 1;
    });
    arraySkus2 = arraySkus2;
  });
</script>

{#if $credentials.settings && $credentials.settings.hintSku === true}
  <div class="relative col-span-4">
    {#if arraySkus2}
      <input
        on:change={handleChange}
        class="input-oval"
        type="text"
        autocomplete="off"
        name="sku"
        list="seller_custom_field"
        value={seller_custom_field}
      />
      <label class="label-oval" for="sku">Sku</label>
      <datalist id="seller_custom_field">
        <select name="sku ">
          {#each arraySkus2 as value}
            <option>{value}</option>
          {/each}
          <option>{seller_custom_field}</option>
        </select>
      </datalist>
    {/if}
  </div>
{:else}
  <div class="relative col-span-3">
    <input
      on:change={handleChange}
      value={seller_custom_field}
      class="input-oval"
      type="text"
      name="sku"
      required
    />
    <label class="label-oval" for="sku">Sku</label>
  </div>
{/if}
<!-- <button class="col-span-1"
  ><i class="material-icons text-teal-500">skip_next</i></button
> -->
