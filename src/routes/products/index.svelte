<script>
  import ModalMassiveAction from "./../../lib/products/ModalMassiveAction.svelte";
  import { fade } from "svelte/transition";
  import { exportTableToExcel } from "../../helpers/exportTableToExcel";
  import { tooltip } from "./../../lib/tooltip/tooltip";
  import ModalDelProd from "../../lib/products/ModalDelProd.svelte";
  import { onMount, tick } from "svelte";
  import { clickOutside } from "./../../helpers/clickOutside";
  import { getApiCategoriesMl } from "./../../services/api/categoriesML.js";
  import { loading, settings } from "./../../store/stores.js";
  import { notification } from "../../store/stores";
  import { createCategories } from "./../../services/api/categories.js";
  import { postproducts } from "../../services/api/products.js";
  import {
    postproductsMl,
    getProductsMl,
    getApiProductsMl,
    getApiItemsMl,
  } from "../../services/api/productsMl.js";
  import Modal2 from "./../../lib/Modal2.svelte";
  import Pagination from "./../../lib/Pagination.svelte";
  import { getProducts } from "../../services/api/products";
  import { getAllCategories } from "../../services/api/categories";

  let modalDelete;
  let modalMassive;
  let products = [];
  let search = null;
  let more = false;
  let currentProd = null;
  let selected = [];
  let action = "Acción masiva";
  let pagination = {
    limit: $settings.itemsxpage,
    offset: 0,
  };

  function changeAction(e) {
    if (e.target.value === "Acción masiva") return;
    action = e.target.value;
    modalMassive.show();
  }

  function changeAllSelect(e) {
    const check = e.target.checked;
    selected = !e.target.checked ? [] : products.map((prod) => prod.id);
  }

  function changeSelect(e) {
    const id = parseInt(e.target.id);
    const check = e.target.checked;
    selected = !check
      ? selected.filter((item) => item !== id)
      : [...selected, id];
  }

  function handleClickOutside() {
    more = false;
  }

  function hideModalDelete(reload) {
    if (reload) loadData();
    modalDelete.hide();
  }

  function hideModalMassive(results) {
    action = "Acción masiva";
    modalMassive.hide();
    if (results) {
      modalMassive.hide();
      loadData();
    }
  }

  async function importMl() {
    try {
      loading.show(true);
      const mlApiItemsId = await getApiItemsMl();
      const mlApiProducts = await getApiProductsMl(mlApiItemsId.results);
      const mlProducts = await getProductsMl();
      const allCategories = await getAllCategories();

      let newCategoriesId = [];
      let newItems = [];
      let updItems = [];
      mlApiProducts.forEach((apiMlProd) => {
        const index = mlProducts.findIndex(
          (mlProd) => mlProd.id === apiMlProd.id
        );
        index === -1 ? newItems.push(apiMlProd) : updItems.push(apiMlProd);
        const index2 = allCategories.findIndex(
          (cat) => cat.id === apiMlProd.category_id
        );
        if (index2 === -1) {
          if (!newCategoriesId.includes(apiMlProd.category_id))
            newCategoriesId.push(apiMlProd.category_id);
        }
      });
      if (newCategoriesId.length > 0) {
        const newCategories = await getApiCategoriesMl(newCategoriesId);
        await createCategories(newCategories);
      }
      const newProducts = await postproducts(newItems);
      await postproductsMl(newProducts);

      console.log("TODO: // update updItems", updItems);

      loadData();
    } catch (error) {
      console.log("ERRORRRR", error);
      notification.show(error, "error");
    } finally {
      loading.show(false);
    }
  }

  function refreshData(pag) {
    pagination = pag;
    loadData();
  }

  function handleDelete(prod) {
    currentProd = prod;
    modalDelete.show();
  }

  async function loadData() {
    try {
      loading.show(true);
      const data = await getProducts(
        pagination.limit,
        pagination.offset,
        search
      );
      products = data.results;
      console.log("Products", products);
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

  onMount(async () => {
    await tick();
    loadData();
  });
</script>

<caption
  class="flex pl-0 pr-3 items-center justify-between flex-col sm:flex-row bg-secondaryColor text-white min-w-[320px] border py-1 border-gray-900"
>
  <div class="flex items-center">
    <div
      on:click={() => (more = !more)}
      use:clickOutside
      on:click_outside={handleClickOutside}
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
          class="absolute bg-secondaryColor z-10 border border-t-0 px-10 py-1 border-gray-900"
        >
          <li class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
            <button class="flex items-center">
              <i class="material-icons text-teal-700">add_circle</i>
              <span class="ml-2">Nuevo Producto</span>
            </button>
          </li>
          <li class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
            <button on:click={importMl}>Importar ML</button>
          </li>
          <li class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
            <button on:click={() => exportTableToExcel("tblData")}
              >Exportar Excel</button
            >
          </li>
        </ul>
      {/if}
    </div>

    <span class="text-lg ml-5">Productos: {pagination.total}</span>
  </div>
  <div class="flex items-center">
    <input
      class="text-black w-[250px] pl-1"
      name="search"
      type="search"
      bind:value={search}
      on:blur={loadData}
    />
  </div>
  <!-- <button on:click={() => modalCreate.show()}
    ><i class="material-icons mt-1 text-teal-700">add_circle</i></button
  > -->
  <div class="w-40 relative">
    <select
      disabled={selected.length === 0}
      class="w-full bg-none bg-transparent p-1 pl-2 px-2 rounded text-white bg-secondaryColor border border-solid border-gray-500"
      name="action"
      id="action"
      value={action}
      on:change={changeAction}
    >
      <option value="Acción masiva">Acción masiva</option>
      <option value="actionDeleteProd">Eliminar</option>
      <option value="changeStatusProd">Estado</option>
      <option value="changePriceProd">Precio</option>
    </select>
  </div>
</caption>

<table id="tblData" class="responsive-table">
  <thead>
    <tr>
      <th
        ><input
          class="cursor-pointer accent-teal-600"
          type="checkbox"
          on:change={changeAllSelect}
        /></th
      >
      <th>ID</th>
      <th>Imagen</th>
      <th>Categoría</th>
      <th>Estado</th>
      <th>Precio</th>
      <th>Producto</th>
      <th>Acciones</th>
    </tr>
  </thead>
  <tbody>
    {#each products as product}
      <tr>
        <td
          ><input
            class="cursor-pointer accent-teal-600"
            type="checkbox"
            checked={selected.includes(product.id)}
            id={product.id}
            on:change={changeSelect}
          /></td
        >
        <td>{product.id}</td>
        <td><img class="w-20" src={product.thumbnail} alt="" /></td>
        <td>{product.categoryId}</td>
        <td>{product.status}</td>
        <td>{product.price}</td>
        <td>{product.name}</td>
        <td>
          <div class="flex items-center justify-between">
            {#if product.prodMl}
              <button
                title={`${product.prodMl.id}<br>${product.prodMl.status}<br>${product.prodMl.price}`}
                use:tooltip
              >
                <img class="w-8" src="./images/logos/ML.webp" alt="" />
              </button>
            {/if}
            <button on:click={handleDelete(product)} id={product.id}
              ><i class="ml-1 px-1 material-icons text-teal-600 text-lg">edit</i
              ></button
            >
            <button on:click={handleDelete(product)} id={product.id}
              ><i class="ml-1 px-1 material-icons text-red-600 text-lg"
                >delete</i
              ></button
            >
          </div>
        </td>
      </tr>
    {/each}
  </tbody>
</table>

{#if pagination.total}
  <Pagination {refreshData} {pagination} />
{/if}

<Modal2 bind:this={modalDelete}>
  <ModalDelProd {currentProd} {hideModalDelete} />
</Modal2>

<Modal2 bind:this={modalMassive}>
  <ModalMassiveAction items={selected} {action} {hideModalMassive} />
</Modal2>
