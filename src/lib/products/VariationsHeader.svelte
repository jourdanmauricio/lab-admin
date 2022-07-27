<script>
  import { tooltip } from "./../../lib/tooltip/tooltip";
  import Modal2 from "./../Modal2.svelte";
  import { notification } from "../../store/stores";

  import VartiationsAddCustomAttribute from "./VartiationsAddCustomAttribute.svelte";

  export let categoryVariations;
  export let addCustomAttribute;
  export let removeCustomAttribute;

  let modalAddCustomAttribute;
  let customAttribute = false;

  function newCustomAttribute() {
    let index = categoryVariations.findIndex(
      (atrib) => !atrib.tags.hasOwnProperty("allow_variations")
    );
    if (index !== -1) {
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
      title="Agregar atributo personalizado"
      use:tooltip
      class="hover:bg-gray-400 rounded-full transition duration-500"
      on:click={newCustomAttribute}
    >
      <i class="px-2 material-icons leading-normal text-teal-700">add_circle</i>
    </button>
  {:else}
    <button
      title="Eliminar atributo personalizado"
      use:tooltip
      class="hover:bg-gray-400 rounded-full transition duration-500"
      on:click={removeCustom}
    >
      <i class="px-2 material-icons leading-normal text-red-600">delete</i>
    </button>
  {/if}
</div>

<Modal2 bind:this={modalAddCustomAttribute}>
  <VartiationsAddCustomAttribute {addCustom} />
</Modal2>
