<script>
  import ModalShowCategory from "./ModalShowCategory.svelte";
  import ModalCreateCategory from "./ModalCreateCategory.svelte";
  import ModalDeleteCategory from "./ModalDeleteCategory.svelte";
  import { getCategories } from "./../../services/api/categories.js";
  import { exportTableToExcel } from "../../helpers/exportTableToExcel.js";
  import { clickOutside } from "./../../helpers/clickOutside";
  import { loading, notification } from "./../../store/stores";
  import Pagination from "./../../lib/Pagination.svelte";
  import Modal2 from "./../../lib/Modal2.svelte";
  import { settings } from "./../../store/stores.js";
  import { onMount, tick } from "svelte";
  import { fade } from "svelte/transition";

  let modalDelete;
  let modalCreate;
  let modalShow;
  let categories = [];
  let search = null;
  let more = false;

  let pagination = {
    limit: $settings.itemsxpage,
    offset: 0,
  };
  let currentCat = null;

  onMount(async () => {
    await tick();
    loadData();
  });
  async function loadData() {
    try {
      loading.show(true);

      const data = await getCategories(
        pagination.limit,
        pagination.offset,
        search
      );
      categories = data.results;
      pagination = {
        limit: data.paging.limit,
        offset: data.paging.offset,
        total: data.paging.total,
        results: data.results.length,
      };
    } catch (error) {
      notification.show(error, "error");
    } finally {
      loading.show(false);
    }
  }

  function handleDelete(cat) {
    currentCat = cat;
    modalDelete.show();
  }

  function handleShow(cat) {
    currentCat = cat;
    modalShow.show();
  }

  function refreshData(pag) {
    pagination = pag;
    loadData();
  }
  function handleCloseCreateCategory(load) {
    modalCreate.hide();
    if (load) loadData();
  }
  function handleCloseDeleteCategory(load) {
    modalDelete.hide();
    if (load) loadData();
  }
  // function handleCloseShowCategory(load) {
  //   modalShow.hide();
  // }
</script>

<caption
  class="flex pl-0 pr-3 items-center justify-between mt-10 flex-col sm:flex-row bg-secondaryColor text-white min-w-[320px] border px-10 py-1 border-gray-900 "
>
  <div class="flex items-center">
    <div
      on:click={() => (more = !more)}
      use:clickOutside
      on:click_outside={() => {
        more = false;
      }}
    >
      <button
        class="inline-flex items-center p-2 text-sm font-medium text-center rounded-full hover:bg-gray-100 focus:outline-none  dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        type="button"
      >
        <i class="material-icons" aria-hidden="true">more_vert</i>
      </button>
      <!-- Dropdown menu -->
      {#if more}
        <ul
          transition:fade
          class="absolute bg-secondaryColor z-10 border border-t-0 px-1 py-1 border-gray-900"
        >
          <li class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
            <button
              class="flex items-center"
              on:click={() => modalCreate.show()}
            >
              <i class="material-icons text-teal-700">add_circle</i>
              <span class="ml-2">Nueva Categoría</span>
            </button>
          </li>
          <li class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
            <button on:click={() => exportTableToExcel("tblData")}
              >Exportar Excel</button
            >
          </li>
        </ul>
      {/if}
    </div>

    <span class="text-lg ml-5">Categorías: {pagination.total}</span>
  </div>
  <div class="flex items-center">
    <input
      class="text-black w-[250px] pl-1"
      name="search"
      type="search"
      bind:value={search}
      on:blur={loadData}
    />
  </div></caption
>

<table id="tblData" class="responsive-table">
  <thead>
    <tr>
      <th>ID</th>
      <th>Categoría</th>
      <th>Acciones</th>
    </tr>
  </thead>
  <tbody>
    {#each categories as category}
      <tr>
        <td>{category.id}</td>
        <td>{category.full_name}</td>
        <td>
          <button on:click={handleShow(category)} id={category.id}>
            <i class="material-icons text-blue-600">visibility</i>
          </button>

          <button
            class="ml-4"
            on:click={handleDelete(category)}
            id={category.id}
          >
            <i class="material-icons text-red-600">delete</i>
          </button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
{#if pagination.total}
  <Pagination {refreshData} {pagination} />
{/if}

<Modal2 bind:this={modalDelete}>
  <ModalDeleteCategory {currentCat} {handleCloseDeleteCategory} />
</Modal2>

<Modal2 width="w-11/12 lg:w-3/4" bind:this={modalCreate}>
  <ModalCreateCategory {handleCloseCreateCategory} />
</Modal2>

<Modal2 width="w-11/12 lg:w-3/4" bind:this={modalShow}>
  <ModalShowCategory {currentCat} />
</Modal2>

<style>
  /*	Label the data 	*/
  @media only screen and (max-width: 1024px) {
    td:nth-of-type(1):before {
      content: "Id";
    }
    td:nth-of-type(2):before {
      content: "Categoría";
    }
    td:nth-of-type(3):before {
      content: "Acciones";
    }
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus {
      /* -webkit-text-fill-color: #141e30; */
      transition: background-color 5000s ease-in-out 0s;
      /* caret-color: var(--principal-color); */
    }
  }
</style>
