<script>
  import { loading, notification } from "./../../store/stores.js";
  import { deleteProduct } from "../../services/api/products";

  export let items;
  export let hideModalMassive;

  async function deleteProds() {
    loading.show(true);
    try {
      await deleteProduct(items);
      notification.show("Productos eliminados", "success");
      hideModalMassive(true);
    } catch (err) {
      notification.show(err, "error");
    } finally {
      loading.show(false);
    }
  }
</script>

<div class="mt-10 flex justify-between">
  <button class="ripple btn" on:click={hideModalMassive(false)}>Cancelar</button
  >
  <button
    class="ripple rounded bg-red-900 text-white py-1 px-10"
    on:click={deleteProds}
  >
    Eliminar
  </button>
</div>
