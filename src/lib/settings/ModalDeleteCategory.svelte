<script>
  import { deleteCategory } from "./../../services/api/categories.js";
  import { loading, notification } from "../../store/stores.js";

  export let currentCat;
  export let handleCloseDeleteCategory;

  async function delCategory(id) {
    loading.show(true);
    try {
      await deleteCategory(id);
      notification.show(`Categoría eliminada`, "success");
      handleCloseDeleteCategory(true);
    } catch (err) {
      notification.show(err, "error");
    } finally {
      loading.show(false);
    }
  }
</script>

<h2 class="text-2xl text-center">
  Eliminar Categoría {currentCat.id} - {currentCat.name}
</h2>
<div class="py-4">
  <div class="w-full border-t border-gray-900" />
</div>

<p class="mt-5 min-w-[350px]">Está seguro de eliminar la categoría?</p>

<div class="mt-10 flex justify-between">
  <button
    class="ripple rounded bg-red-900 text-white py-1 px-10 "
    on:click={delCategory(currentCat.id)}>Eliminar</button
  >
  <button class="ripple btn" on:click={() => handleCloseDeleteCategory(false)}
    >Cancelar</button
  >
</div>
