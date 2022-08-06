<script>
  import { deleteLocalProduct } from "../../services/api/products.js";
  import { loading, notification } from "../../store/stores";

  export let currentProd;
  export let hideModalDelete;

  async function delProduct(item) {
    loading.show(true);
    try {
      await deleteLocalProduct([item]);
      notification.show("Producto eliminado", "success");
      hideModalDelete(true);
    } catch (err) {
      notification.show(err, "error");
    } finally {
      loading.show(false);
    }
  }
</script>

<h2 class="text-xl text-center">
  Eliminar producto - {currentProd.title}
</h2>
<div class="py-4">
  <div class="w-full border-t border-gray-900" />
</div>

<p class="mt-5 min-w-[350px]">Está seguro de eliminar el producto?</p>

<div class="mt-10 flex justify-between">
  <button
    class="ripple rounded bg-red-900 text-white py-1 px-10 "
    on:click={delProduct(currentProd)}>Eliminar</button
  >
  <button class="ripple btn" on:click={hideModalDelete(false)}>Cancelar</button>
</div>
