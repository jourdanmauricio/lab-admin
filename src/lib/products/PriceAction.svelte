<script>
  import { patchProduct } from "./../../services/api/products.js";
  import { loading, notification } from "./../../store/stores.js";

  export let items;
  export let hideModalMassive;
  let quantity;
  let action = 1;
  let unit = 1;
  let results = [];

  async function submitHandler(event) {
    const formData = new FormData(event.target);
    const formUser = {};
    for (const [key, value] of formData.entries()) {
      formUser[key] = value;
    }
    quantity = parseFloat(quantity);
    const selAction = action === 1 ? "add" : "subtract";
    const selUnit = unit === 1 ? "percent" : "amount";
    items.forEach((item) => {
      const itemPrice = parseFloat(item.price);

      if (selUnit === "amount") {
        item.price =
          selAction === "add" ? itemPrice + quantity : itemPrice - quantity;
      } else {
        item.price =
          selAction === "add"
            ? itemPrice + (quantity * itemPrice) / 100
            : itemPrice - (quantity * itemPrice) / 100;
      }
      results.push({ id: item.id, price: item.price });
    });
    loading.show(true);

    try {
      const res = await patchProduct(results);
      notification.show("Productos eliminados", "success");
      hideModalMassive(true);
    } catch (err) {
      notification.show(err, "error");
    } finally {
      loading.show(false);
    }
  }
</script>

<form on:submit|preventDefault={submitHandler}>
  <div
    class="p-5 grid grid-cols-2 justify-items-center border border-solid border-gray-800 rounded"
  >
    <div>
      <div>
        <input
          style="accent-color: teal;"
          class="rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-teal-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          type="radio"
          name="action"
          id="aumentar"
          bind:group={action}
          value={1}
        />
        <label
          class="form-check-label inline-block text-gray-800"
          for="aumentar"
        >
          Aumentar
        </label>
      </div>
      <div>
        <input
          style="accent-color: teal;"
          class="rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-teal-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          type="radio"
          name="action"
          id="disminuir"
          bind:group={action}
          value={2}
        />
        <label
          class="form-check-label inline-block text-gray-800"
          for="disminuir"
        >
          Disminuir
        </label>
      </div>
    </div>
    <div>
      <div>
        <input
          style="accent-color: teal;"
          class="rounded-full h-4 w-4 border border-gray-300 bg-white  checked:bg-teal-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          type="radio"
          name="unit"
          id="percent"
          bind:group={unit}
          value={1}
        />
        <label
          class="form-check-label inline-block text-gray-800"
          for="percent"
        >
          Porcentaje
        </label>
      </div>
      <div>
        <input
          style="accent-color: teal;"
          class="rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-teal-600  focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          type="radio"
          name="unit"
          id="quantity"
          bind:group={unit}
          value={2}
        />
        <label
          class="form-check-label inline-block text-gray-800"
          for="quantity"
        >
          Cantidad
        </label>
      </div>
    </div>
    <div class="mt-6 relative col-span-2">
      <input
        class="input-oval"
        type="number"
        step="1.00"
        min="0"
        bind:value={quantity}
        name="quantity"
        required
      />
      <label class="label-oval" for="quantity">Cantidad</label>
    </div>
    {#if quantity}
      <div class="col-span-2 mt-4">
        <p>
          {action === 1 ? "Aumentar" : "Disminuir"}
          {quantity}
          {unit === 1 ? "%" : "$"}
        </p>
      </div>
    {/if}
  </div>

  <div class="mt-10 min-w-[300px] flex justify-between">
    <button class="ripple btn" on:click={hideModalMassive(false)}
      >Cancelar</button
    >
    <button class="ripple btn">Modificar</button>
  </div>
</form>
