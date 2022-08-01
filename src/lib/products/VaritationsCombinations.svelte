<script>
  import { product } from "./../../store/stores.js";
  import { notification } from "../../store/stores";

  export let categoryVariations;

  $: atribProdVariations =
    $product.variations.length > 0
      ? $product.variations[0].attribute_combinations.map(
          (attribute) => attribute.id
        )
      : [];

  let attributesComb = {};

  $: sortedByName = (values) => {
    return values.sort((a, b) => 0 - (a.name > b.name ? -1 : 1));
  };

  $: newSku = () => {
    let sku = 1;
    if (!$product.variations.length === 0) {
      let max = 1;
      $product.variations.forEach((variation) => {
        let varSku = variation.attributes.find(
          (atrib) => atrib.id === "SELLER_SKU"
        );
        if (varSku) {
          let varSku2 = varSku.value_name.split("--");
          if (varSku2.length > 1) {
            let varSku3 = parseInt(varSku2[1]) + 1;
            if (varSku3 > max) {
              max = varSku3;
              sku = max;
            }
          }
        }
      });
    }
    return sku;
  };

  function handleCombinations(e, categoryVariation) {
    let attributes = [];
    if (e.target.options) {
      Array.prototype.forEach.call(e.target.options, function (option) {
        if (option.selected)
          attributes.push({
            id: e.target.id,
            name: categoryVariation.name,
            value_id: option.value,
            value_name: option.text,
          });
      });
      attributesComb[e.target.id] = attributes;
    } else {
      attributes.push({
        id: e.target.id,
        name: categoryVariation.name,
        value_name: e.target.value,
      });
      attributesComb[e.target.id] = attributes;
    }
  }

  function handleSubmit(e) {
    if (Object.keys(attributesComb).length === 0) {
      notification.show("Agregué un atributo personalizado", "error");
      return;
    }

    //////////////////////////////////////////////////
    let values = Object.values(attributesComb);

    const f = (a, b) =>
      [].concat(...a.map((d) => b.map((e) => [].concat(d, e))));
    const cartesian = (a, b, ...c) => (b ? cartesian(f(a, b), ...c) : a);

    let output = [];
    if (values.length > 1) {
      output = cartesian(...values);
    } else {
      values[0].forEach((value) => output.push([value]));
    }

    //////////////////////////////////////////////////

    const redudeArray = (arr) =>
      arr.map((el) => {
        return { id: el.id, value_name: el.value_name, name: el.name };
      });

    let atribsVariation = [];
    $product.variations.forEach((variation) =>
      atribsVariation.push(redudeArray(variation.attribute_combinations))
    );

    let atribsNewVariations = [];
    output.forEach((vari) => atribsNewVariations.push(redudeArray(vari)));

    //////////////////////////////////////

    const objectsEqual = (o1, o2) =>
      typeof o1 === "object" && Object.keys(o1).length > 0
        ? Object.keys(o1).length === Object.keys(o2).length &&
          Object.keys(o1).every((p) => objectsEqual(o1[p], o2[p]))
        : o1 === o2;

    const arraysEqual = (a1, a2) =>
      a1.length === a2.length && a1.every((o, idx) => objectsEqual(o, a2[idx]));

    //////////////////////////////////////

    const newInVar = (newVar, variations) => {
      let found = false;
      for (let i = 0; i < variations.length; i++) {
        found = arraysEqual(newVar, variations[i]);
        if (found === true) break;
      }
      return found;
    };

    let newVariations = [];
    let exists = 0;
    let sku = newSku();
    atribsNewVariations.forEach((newVar) => {
      let found = newInVar(newVar, atribsVariation);
      if (!found) {
        let variation = {
          id: `${$product.seller_custom_field}--${sku}`,
          attribute_combinations: newVar,
          available_quantity: 1,
          picture_ids: [],
          attributes: [
            {
              id: "SELLER_SKU",
              value_name: `${$product.seller_custom_field}--${sku}`,
            },
          ],
          price: $product.price || 0,
          updated: true,
        };
        newVariations.push(variation);
      } else {
        exists += 1;
      }
      sku += 1;
    });
    if (exists > 0) notification.show(`${exists} variaciones existen`, "error");

    if (newVariations.length > 0)
      product.update({
        variations: [...$product.variations, ...newVariations],
      });
    newVariations = [];
    e.target.reset();
  }
</script>

<div class="flex justify-center">
  <form on:submit|preventDefault={handleSubmit}>
    <ul
      class="bg-white w-full rounded-b-lg border border-gray-200 text-gray-900"
    >
      {#each categoryVariations as categoryVariation}
        <li
          class="px-6 py-2 border-b border-gray-200 w-full hover:bg-gray-100 transition duration-500"
        >
          <div class="grid grid-cols-3">
            <div class="col-span-1">{categoryVariation.name}</div>
            {#if !categoryVariation.hasOwnProperty("values")}
              <div class="relative col-span-2">
                <input
                  on:change={(e) => handleCombinations(e, categoryVariation)}
                  disabled={atribProdVariations.length > 0 &&
                    !atribProdVariations.includes(categoryVariation.id)}
                  class="input-oval"
                  type="text"
                  name="value"
                  id={categoryVariation.id}
                  required={$product.variations.length > 0}
                />
                <label class="label-oval" for="value" />
              </div>
            {:else}
              <select
                on:change={(e) => handleCombinations(e, categoryVariation)}
                disabled={atribProdVariations.length > 0 &&
                  !atribProdVariations.includes(categoryVariation.id)}
                class="input-oval col-span-2"
                name={categoryVariation.id}
                id={categoryVariation.id}
                multiple
                require={$product.variations.length > 0}
              >
                {#each sortedByName(categoryVariation.values) as value}
                  <option value={value.id}>{value.name}</option>
                {/each}
              </select>
            {/if}
          </div>
        </li>
      {/each}
      <li class="px-6 py-4">
        <button class="w-full btn ripple">Crear variación</button>
      </li>
    </ul>
  </form>
</div>
