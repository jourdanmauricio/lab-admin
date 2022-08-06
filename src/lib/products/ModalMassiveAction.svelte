<script>
  import PriceAction from "./massive/PriceAction.svelte";
  import StatusAction from "./massive/StatusAction.svelte";
  import { traduction } from "./../../helpers/traduction";
  import AppSelection from "./AppSelection.svelte";
  import {
    deleteLocalProduct,
    delLocalMlProduct,
    patchLocalMlProduct,
    patchLocalProduct,
    patchMlProduct,
  } from "../../services/api/products";
  import { loading } from "../../store/stores";

  export let items;
  export let action;
  export let hideModalMassive;

  let status = null;
  let quantityPrice = 0;
  let actionPrice = 1;
  let unitPrice = 1;
  let results = [];

  let body = {};
  let localBody = {};

  let application = {
    ml: true,
    local: true,
    web: false,
  };

  function setApplication(e) {
    application[e.target.id] = e.target.checked;
  }

  function setStatus(selStatus) {
    status = selStatus;
    console.log("status", status);
  }

  function handleSubmit() {
    console.log("items", items);
    loading.show(true);
    items.forEach(async (item) => {
      switch (action) {
        case "changeStatusProd":
          console.log("action", action);
          body = { status };
          localBody = { status };
          break;
        case "changePriceProd":
          console.log("quantityPrice", quantityPrice);
          console.log("actionPrice", actionPrice);
          console.log("unitPrice", unitPrice);
          let price;
          let lPrice;
          let variations = [];
          let lVariations = [];

          quantityPrice = parseFloat(quantityPrice);
          const selAction = actionPrice === 1 ? "add" : "subtract";
          const selUnit = unitPrice === 1 ? "percent" : "amount";
          const itemPrice = parseFloat(item.price);
          const itemLPrice = parseFloat(item.prodMl.price);

          if (selUnit === "amount") {
            price =
              selAction === "add"
                ? itemPrice + quantityPrice
                : itemPrice - quantityPrice;
            lPrice =
              selAction === "add"
                ? itemLPrice + quantityPrice
                : itemLPrice - quantityPrice;
          } else {
            price =
              selAction === "add"
                ? itemPrice + (quantityPrice * itemPrice) / 100
                : itemPrice - (quantityPrice * itemPrice) / 100;
            lPrice =
              selAction === "add"
                ? itemLPrice + (quantityPrice * itemLPrice) / 100
                : itemLPrice - (quantityPrice * itemLPrice) / 100;
          }
          body = { price };
          localBody = { price: lPrice };
          if (item.variations.length > 0) {
            item.variations.forEach((vari) => {
              variations.push({ id: vari.id, price });
              vari.price = lPrice;
              lVariations.push(vari);
            });
            body.variations = variations;
            localBody.variations = lVariations;
            delete body.price;
          }
          break;
        case "actionDeleteProd":
          console.log("Delete");
          if (item.prodMl.status === "under_review") {
            body = { deleted: "true" };
          } else {
            body = { status: "closed" };
          }
          localBody = { id: item.id };
          break;
      }
      if (application.ml && Object.keys(body).length > 0) {
        body.id = item.prodMl.id;
        const mlRes = await patchMlProduct(body);
        console.log("MlRes", mlRes);
        if (action === "actionDeleteProd") {
          body.id = item.prodMl.id;
          const localMlRes = await delLocalMlProduct(body);
          console.log("localMlRes", localMlRes);
        } else {
          mlRes.prod_id = item.id;
          const localMlRes = await patchLocalMlProduct(mlRes);
          console.log("localMlRes", localMlRes);
        }
      }
      if (application.local && Object.keys(localBody).length > 0) {
        localBody.id = item.id;
        if (action === "actionDeleteProd") {
          const localRes = await deleteLocalProduct(localBody);
          console.log("localRes", localRes);
        } else {
          const localRes = await patchLocalProduct(localBody);
          console.log("localRes", localRes);
        }
      }
    });
    loading.show(false);
  }
</script>

<div class="flex flex-col h-full">
  <h2 class="text-xl text-center">
    Acción masiva - {traduction(action)}
  </h2>

  <div class="py-4">
    <div class="w-full border-t border-gray-900" />
  </div>

  <div class="flex-grow">
    <p>Cantidad de items seleccionados: {items.length}</p>

    <div
      name="appSelection"
      class="mt-6 flex flex-wrap justify-evenly border border-solid border-gray-900 rounded p-1"
    >
      <AppSelection {application} {setApplication} />
    </div>

    {#if action === "changePriceProd"}
      <PriceAction bind:quantityPrice bind:actionPrice bind:unitPrice />
    {/if}
    {#if action === "changeStatusProd"}
      <StatusAction {setStatus} />
    {/if}
  </div>
  <div class="mt-10 flex justify-between">
    <button class="ripple btn" on:click={hideModalMassive(false)}
      >Cancelar</button
    >
    <button class="ml-10 ripple btn" on:click={handleSubmit}
      >{action === "actionDeleteProd" ? "Eliminar" : "Modificar"}</button
    >
  </div>
</div>
