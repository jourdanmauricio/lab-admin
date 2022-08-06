<script>
  export let quantityPrice;
  export let actionPrice;
  export let unitPrice;
</script>

<div
  class="p-5 mt-4 grid grid-cols-2 justify-items-center border border-solid border-gray-800 rounded"
>
  <div>
    <div>
      <input
        style="accent-color: teal;"
        class="rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-teal-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
        type="radio"
        name="actionPrice"
        id="aumentar"
        bind:group={actionPrice}
        value={1}
      />
      <label class="form-check-label inline-block text-gray-800" for="aumentar">
        Aumentar
      </label>
    </div>
    <div>
      <input
        style="accent-color: teal;"
        class="rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-teal-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
        type="radio"
        name="actionPrice"
        id="disminuir"
        bind:group={actionPrice}
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
        name="unitPrice"
        id="percent"
        bind:group={unitPrice}
        value={1}
      />
      <label class="form-check-label inline-block text-gray-800" for="percent">
        Porcentaje
      </label>
    </div>
    <div>
      <input
        style="accent-color: teal;"
        class="rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-teal-600  focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
        type="radio"
        name="unitPrice"
        id="quantityPrice"
        bind:group={unitPrice}
        value={2}
      />
      <label
        class="form-check-label inline-block text-gray-800"
        for="quantityPrice"
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
      bind:value={quantityPrice}
      name="quantityPrice"
      required
    />
    <label class="label-oval" for="quantityPrice">Cantidad</label>
  </div>
  {#if quantityPrice}
    <div class="col-span-2 mt-4">
      <p>
        {actionPrice === 1 ? "Aumentar" : "Disminuir"}
        {quantityPrice}
        {unitPrice === 1 ? "%" : "$"}
      </p>
    </div>
  {/if}
</div>
