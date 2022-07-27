<script>
  import { product } from "./../../store/stores.js";
  import { notification } from "../../store/stores";

  export let categoryVariations;

  let attributesComb = {};
  let newVariations = [];

  $: sortedByName = (values) => {
    return values.sort((a, b) => 0 - (a.name > b.name ? -1 : 1));
  };

  function handleCombinations(e) {
    let attributes = [];
    if (e.target.options) {
      Array.prototype.forEach.call(e.target.options, function (option) {
        if (option.selected)
          attributes.push({
            id: e.target.id,
            value_id: option.value,
            value_name: option.text,
          });
      });
      attributesComb[e.target.id] = attributes;
    } else {
      attributes.push({
        id: e.target.id,
        value_name: e.target.value,
      });
      attributesComb[e.target.id] = attributes;
    }
    console.log("attributes Comb", attributesComb);
  }

  function handleSubmit() {
    if (Object.keys(attributesComb).length === 0) {
      // if (attributesComb.length === 0) {
      notification.show("Agregué un atributo personalizado", "error");
      return;
    }
    console.log("attributes Comb", attributesComb);
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

    console.log("output ", output);

    output.forEach((vari, index) => {
      let variation = {
        id: `${$product.seller_custom_field}-${index + 1}`,
        attribute_combinations: vari,
        available_quantity: 1,
        pictures: [],
        attributes: [
          {
            id: "SKU",
            value_name: `${$product.seller_custom_field}-${index + 1}`,
          },
        ],
        price: $product.price || 0,
      };
      newVariations.push(variation);
    });
    console.log("Variations", newVariations);

    product.update({ variations: [...$product.variations, ...newVariations] });
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
                  on:change={handleCombinations}
                  class="input-oval"
                  type="text"
                  name="value"
                  id={categoryVariation.id}
                  required
                />
                <label class="label-oval" for="value" />
              </div>
            {:else}
              <select
                on:change={handleCombinations}
                class="input-oval col-span-2"
                name={categoryVariation.id}
                id={categoryVariation.id}
                multiple
                required
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
