<script>
  import { onMount } from "svelte";
  import { getSkus } from "../../services/api/products";
  import { product } from "../../store/stores";

  let arraySkus2 = [];

  $: seller_custom_field = $product.seller_custom_field || "";

  // function newSku() {
  //   let sku = 1;
  //   if ($product.variations.length > 0) {
  //     let max = 1;
  //     $product.variations.forEach((variation) => {
  //       let varSku = variation.attributes.find(
  //         (atrib) => atrib.id === "SELLER_SKU"
  //       );
  //       if (varSku) {
  //         let varSku2 = varSku.value_name.split("--");
  //         if (varSku2.length > 1) {
  //           let varSku3 = parseInt(varSku2[1]) + 1;
  //           if (varSku3 > max) {
  //             max = varSku3;
  //             sku = max;
  //           }
  //         }
  //       }
  //     });
  //   }
  //   return sku;
  // }

  // TODO: Add validation (if exists). Add setting config (if suggest)

  function handleChange(e) {
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
    let sigla;
    let siglas = [];
    let arraySkus = await getSkus();
    console.log("arraySkus", arraySkus);

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
    console.log("arraySkus2", arraySkus2);
    arraySkus2 = arraySkus2;
  });
</script>

<div class="relative col-span-4">
  {#if arraySkus2}
    <input
      on:change={(e) => handleChange(e)}
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

<!-- <div class="relative col-span-3">
  <input
    on:blur={(e) => product.update({ seller_custom_field: e.target.value })}
    value={seller_custom_field}
    class="input-oval"
    type="text"
    name="sku"
    required
  />
  <label class="label-oval" for="sku">Sku</label> -->
<!-- </div> -->
<!-- <button class="col-span-1"
  ><i class="material-icons text-teal-500">skip_next</i></button
> -->
