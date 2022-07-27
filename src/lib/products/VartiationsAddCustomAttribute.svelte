<script>
  import { notification } from "../../store/stores";

  export let addCustom;

  let attribute = "";

  function handleAddAtribute() {
    if (attribute.trim().length === 0) {
      notification.show("Ingresa un nombre de atributo");
      return;
    }
    addCustom(attribute);
  }
</script>

<h2 class="text-xl text-center">Agregar atributo personalizado</h2>
<div class="py-4">
  <div class="w-full border-t border-gray-900" />
</div>

<div class="relative mt-6">
  <input
    bind:value={attribute}
    class="input-oval"
    type="text"
    name="attribute"
    required
  />
  <label class="label-oval" for="attribute">Atributo</label>
</div>
<div class="mt-8 flex justify-end">
  <button on:click={handleAddAtribute} class="btn ripple">Agregar</button>
</div>
