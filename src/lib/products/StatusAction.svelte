<script>
  import { loading, notification } from "./../../store/stores.js";
  import { patchProduct } from "../../services/api/products";

  export let items;
  export let hideModalMassive;
  let status = "";
  let results = [];

  async function changeStatus() {
    if (status === "") {
      notification.show("Selecciona un estado", "info");
      return;
    }
    loading.show(true);
    items.forEach((item) => {
      results.push({ id: item.id, status: status });
    });
    try {
      const res = await patchProduct(results);
      notification.show("Productos modificados", "success");
      hideModalMassive(true);
    } catch (err) {
      notification.show(err, "error");
    } finally {
      loading.show(false);
    }
  }
</script>

<div class="mt-4 relative">
  <select class="input-oval" name="status" id="status" bind:value={status}>
    <option value="">Estado</option>
    <option value="active">Activo</option>
    <option value="paused">Pausado</option>
    <option value="closed">Finalizado</option>
  </select>
</div>

<div class="mt-10 flex justify-between">
  <button class="ripple btn" on:click={hideModalMassive(false)}>Cancelar</button
  >
  <button class="ml-10 ripple btn" on:click={changeStatus}>Modificar</button>
</div>
