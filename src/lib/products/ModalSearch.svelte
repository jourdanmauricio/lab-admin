<script>
  import { onMount } from "svelte";
  import { loading } from "../../store/stores";
  import { getAllCategories } from "../../services/api/categories";

  export let search;
  export let setSearch;
  export let searchClose;

  let categories = [];
  let statuses = [
    { id: "active", value: "Activo" },
    { id: "paused", value: "Pausado" },
    { id: "under_review", value: "Revisión" },
    { id: "closed", value: "Finalizado" },
  ];
  let conditions = [
    { id: "new", value: "Nuevo" },
    { id: "used", value: "Usado" },
  ];

  function handleChange(id, value) {
    console.log("change");
    search = { ...search, [id]: value };
    console.log("Search", search);
    setSearch(search);
  }

  onMount(async function () {
    try {
      loading.show(true);
      categories = await getAllCategories();
      console.log("categories", categories);
    } catch (error) {
      console.error(error);
    } finally {
      loading.show(false);
    }
  });
</script>

<div class="flex flex-col h-full">
  <h2 class="text-xl text-center">Filtrar Productos</h2>
  <div class="py-4">
    <div class="w-full border-t border-gray-900" />
  </div>
  <div class="flex-grow">
    <div class="mt-4 grid grid-cols-2 gap-4">
      <!-- status -->
      <div class="relative">
        <select
          class="input-oval"
          name="status"
          bind:value={search.status}
          on:change={(e) => handleChange(e.target.name, e.target.value)}
        >
          <option selected value />
          {#each statuses as status}
            <option value={status.id}>{status.value}</option>
          {/each}
        </select>
        <label class="label-oval" for="status">Estado</label>
      </div>
      <!-- id -->
      <div class="relative">
        <input
          class="input-oval"
          type="search"
          name="ml_id"
          bind:value={search.ml_id}
          on:change={(e) => handleChange(e.target.name, e.target.value)}
        />
        <label class="label-oval" for="ml_id">Ml Id</label>
      </div>
    </div>
    <div class="mt-8 grid grid-cols-2 gap-4">
      <!-- title, sku, Description -->
      <div class="relative">
        <input
          class="input-oval"
          type="search"
          name="text"
          bind:value={search.text}
          on:change={(e) => handleChange(e.target.name, e.target.value)}
        />
        <label class="label-oval" for="text">Nombre, SKU, Descripción</label>
      </div>
      <!-- Condition -->
      <div>
        <div class="relative">
          <select
            class="input-oval"
            name="condition"
            bind:value={search.condition}
            on:change={(e) => handleChange(e.target.name, e.target.value)}
          >
            <option selected value />
            {#each conditions as condition}
              <option value={condition.id}>{condition.value}</option>
            {/each}
          </select>
          <label class="label-oval" for="status">Condición</label>
        </div>
      </div>
    </div>
    <!-- category -->
    <div class="mt-8 relative">
      <select
        class="input-oval"
        name="category_id"
        bind:value={search.category_id}
        on:change={(e) => handleChange(e.target.name, e.target.value)}
      >
        <option selected value />
        {#each categories as category}
          <option value={category.id}>{category.full_name}</option>
        {/each}
      </select>
      <label class="label-oval" for="status">Categoría</label>
    </div>
  </div>
  <!-- actions -->
  <div class="mt-4 mb-6 flex justify-end">
    <button on:click={() => searchClose(false)} class="btn ripple"
      >Cancelar</button
    >
    <button on:click={() => searchClose(true)} class="ml-10 btn ripple"
      >Buscar</button
    >
  </div>
</div>
