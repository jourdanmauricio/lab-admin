<script>
  import DeleteAction from "./DeleteAction.svelte";
  import { traduction } from "./../../helpers/traduction";
  export let items;
  export let action;
  export let hideModalMassive;
</script>

<h2 class="text-xl text-center">
  Acción masiva - {traduction(action)}
</h2>

<div class="py-4">
  <div class="w-full border-t border-gray-900" />
</div>

<p>Cantidad de items seleccionados: {items.length}</p>

<div class="mt-4 flex justify-center">
  <div>
    <div class="form-check">
      <input
        class="cursor-pointer accent-teal-600 h-4 w-4 transition duration-200 mt-1 float-left mr-2"
        type="checkbox"
        value=""
        id="checkLocal"
      />
      <label
        class="form-check-label inline-block text-gray-800"
        for="checkLocal"
      >
        Aplicar localmente
      </label>
    </div>
    <div class="form-check">
      <input
        class="cursor-pointer accent-teal-600 h-4 w-4 transition duration-200 mt-1 float-left mr-2"
        type="checkbox"
        value=""
        id="checkMl"
        checked
      />
      <label class="form-check-label inline-block text-gray-800" for="checkMl">
        Aplicar en Mercado Libre
      </label>
    </div>
    <div class="form-check">
      <input
        class="cursor-pointer accent-teal-600 h-4 w-4 transition duration-200 mt-1 float-left mr-2"
        type="checkbox"
        value=""
        id="checkWeb"
        checked
      />
      <label class="form-check-label inline-block text-gray-800" for="checkWeb">
        Aplicar en Web
      </label>
    </div>
  </div>
</div>

<div class="mt-10 flex justify-between">
  <!-- <button class="ripple rounded bg-red-900 text-white py-1 px-10 "
    >Eliminar</button
  > -->

  {#if action === "actionDeleteProd"}
    <DeleteAction {items} {hideModalMassive} />
  {/if}
  <button class="ripple btn" on:click={hideModalMassive(false)}>Cancelar</button
  >
</div>
