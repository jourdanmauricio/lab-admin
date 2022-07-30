<script>
  import { product } from "./../../store/stores.js";
  import Modal2 from "./../Modal2.svelte";
  import { notification } from "../../store/stores";
  import VartiationsAddCustomAttribute from "./VartiationsAddCustomAttribute.svelte";

  export let categoryVariations;
  export let addCustomAttribute;
  export let removeCustomAttribute;

  let modalAddCustomAttribute;
  let customAttribute = false;

  function newCustomAttribute() {
    if (categoryVariations.hasOwnProperty("id")) {
      notification.show(
        "Solo se puede agregar un atributo personalizado",
        "error"
      );
      return;
    }
    modalAddCustomAttribute.show();
  }

  function addCustom(attribute) {
    modalAddCustomAttribute.hide();
    customAttribute = !customAttribute;
    addCustomAttribute(attribute);
  }

  function removeCustom() {
    customAttribute = !customAttribute;
    removeCustomAttribute();
  }
</script>

<div class="flex items-center justify-between bg-gray-200">
  <h2 class="pl-2 text-lg font-semibold">Variaciones</h2>
  {#if !customAttribute}
    <button
      disabled={$product.variations.length > 0}
      class="hover:bg-gray-400 rounded-full transition duration-500"
      on:click={newCustomAttribute}
    >
      <i
        class="{$product.variations.length > 0
          ? 'text-gray-500'
          : 'text-teal-700'} px-2 material-icons leading-normal ">add_circle</i
      >
    </button>
  {:else}
    <button
      disabled={$product.variations.length > 0}
      class="hover:bg-gray-400 rounded-full transition duration-500"
      on:click={removeCustom}
    >
      <i
        class="{$product.variations.length > 0
          ? 'text-gray-500'
          : 'text-red-600'} px-2 material-icons leading-normal ">delete</i
      >
    </button>
  {/if}
</div>

<Modal2 bind:this={modalAddCustomAttribute}>
  <VartiationsAddCustomAttribute {addCustom} />
</Modal2>
