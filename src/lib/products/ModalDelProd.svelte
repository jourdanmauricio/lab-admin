<script>
  import AppAvailable from "./AppAvailable.svelte";
  import {
    deleteLocalProduct,
    delLocalMlProduct,
    patchMlProduct,
  } from "../../services/api/products.js";
  import { loading, notification } from "../../store/stores";

  export let currentProd;
  export let hideModalDelete;

  let application = {
    ml: { show: currentProd.prodMl ? true : false, value: true },
    local: { show: true, value: true },
    web: { show: true, value: true },
  };

  function setApplication(e) {
    application[e.target.id].value = e.target.checked;
  }

  async function handleSubmit(item) {
    let body = {};
    let localBody = {};

    loading.show(true);
    try {
      if (application.ml.value) {
        body = { deleted: "true" };
        body.id = item.prodMl.id;
        const mlRes = await patchMlProduct(body);
        body.id = item.prodMl.id;
        const localMlRes = await delLocalMlProduct(body);
      }
      if (application.local.value) {
        localBody = { id: item.id };
        const localRes = await deleteLocalProduct(localBody);
      }
      hideModalDelete(true);
    } catch (error) {
      notification.show(error, "error");
    } finally {
      loading.show(false);
    }
  }
</script>

<div class="flex flex-col h-full">
  <h2 class="text-xl text-center">
    Eliminar producto - {currentProd.title}
  </h2>
  <div class="py-4">
    <div class="w-full border-t border-gray-900" />
  </div>
  <div class="flex-grow">
    <p class="mt-5 min-w-[350px]">Está seguro de eliminar el producto?</p>

    <div
      name="appSelection"
      class="mt-6 flex flex-wrap justify-evenly border border-solid border-gray-900 rounded p-1"
    >
      <AppAvailable {application} {setApplication} />
    </div>
  </div>
  <div class="mt-10 flex justify-between">
    <button class="ripple btn" on:click={hideModalDelete(false)}
      >Cancelar</button
    >
    <button
      class="ripple rounded bg-red-900 text-white py-1 px-10 "
      on:click={handleSubmit(currentProd)}>Eliminar</button
    >
  </div>
</div>
