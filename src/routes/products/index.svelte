<script>
  import { fade } from "svelte/transition";
  import { onMount, tick } from "svelte";
  import { goto } from "$app/navigation";
  import { clickOutside } from "./../../helpers/clickOutside";
  import { exportTableToExcel } from "../../helpers/exportTableToExcel";
  import {
    loading,
    product,
    settings,
    credentials,
  } from "./../../store/stores.js";
  import { notification } from "../../store/stores";
  import { traduction } from "../../helpers/traduction";
  import Modal2 from "./../../lib/Modal2.svelte";
  import Pagination from "./../../lib/Pagination.svelte";
  import ModalMassiveAction from "./../../lib/products/ModalMassiveAction.svelte";
  import ModalDelProd from "../../lib/products/ModalDelProd.svelte";
  import { getAllCategories } from "../../services/api/categories";
  import { getApiCategoriesMl } from "./../../services/api/categoriesML.js";
  import { createCategories } from "./../../services/api/categories.js";
  import { postLocalProducts } from "../../services/api/products.js";
  import {
    getLocalProducts,
    getLocalMlProducts,
    getMlItems,
    getMlProducts,
    patchLocalMlProducts,
    postLocalMlProducts,
  } from "../../services/api/products";
  import ProductDetail from "../../lib/products/ProductDetail.svelte";
  import ModalSearch from "../../lib/products/ModalSearch.svelte";

  let modalDelete;
  let modalMassive;
  let modalProductDetail;
  let modalSearch;
  let products = [];
  let search = { status: null, category_id: null, text: null, id: null };
  let more = false;
  let currentProd = null;
  let selected = [];
  let selItems = [];
  let action = "Acción masiva";
  let pagination = {
    limit: $settings.itemsxpage,
    offset: 0,
  };

  $: ifSearch = Object.values(search).findIndex((el) => el !== null);

  function changeAction(e) {
    if (e.target.value === "Acción masiva") return;
    selItems = [];
    action = e.target.value;
    selected.forEach(
      (item) =>
        (selItems = [
          ...selItems,
          ...products.filter((prod) => prod.id === item),
        ])
    );

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

  function hideModalMassive(refreshData) {
    action = "Acción masiva";
    modalMassive.hide();
    if (refreshData) {
      modalMassive.hide();
      selected = [];
      action = "Acción masiva";
      loadData();
    }
  }

  async function importMl() {
    try {
      loading.show(true);
      const mlApiItemsId = await getMlItems();
      const mlApiProducts = await getMlProducts(mlApiItemsId);
      const mlProducts = await getLocalMlProducts();
      const allCategories = await getAllCategories();

      let newCategoriesId = [];
      let newItems = [];
      let updItems = [];
      mlApiProducts.forEach((apiMlProd) => {
        const found = mlProducts.find((mlProd) => mlProd.id === apiMlProd.id);
        if (found) {
          apiMlProd.prod_id = found.prod_id;
          updItems.push(apiMlProd);
        } else {
          newItems.push(apiMlProd);
        }
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
      // Copio newItems para modificar el precio
      const newItemsPrice = JSON.parse(JSON.stringify(newItems));

      let percent = $credentials.settings.price_percent_ml;
      if ($credentials.settings.hasOwnProperty("price_percent_ml")) {
        newItemsPrice.forEach((itemPrice) => {
          itemPrice.price =
            itemPrice.price - itemPrice.price * (parseInt(percent) / 100);
        });
      }
      const newProducts = await postLocalProducts(newItemsPrice);
      newItems.forEach((item) => {
        let found = newProducts.find((newProd) => item.id === newProd.ml_id);
        if (found) item.prod_id = found.id;
      });
      await postLocalMlProducts(newItems);

      console.log("TODO: // update updItems", updItems);
      await patchLocalMlProducts(updItems);

      notification.show("Productos importados", "success");

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

  function handleEdit(prod) {
    currentProd = prod;
    product.setProduct(currentProd);
    console.log("Edit", currentProd);
    product.update({ action: "edit" });
    product.update({ properties: [] });
    goto("/products/editProduct");
  }

  async function loadData() {
    try {
      loading.show(true);
      const data = await getLocalProducts(
        pagination.limit,
        pagination.offset,
        JSON.stringify(search)
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

  function newProduct() {
    product.update({ action: "new" });
    goto("/products/newProduct");
  }

  function handleDetail(prod) {
    currentProd = prod;
    modalProductDetail.show();
  }

  function setSearch(newSearch) {
    search = newSearch;
  }

  function resetSearch() {
    search = { status: null, category_id: null, text: null, id: null };
    loadData();
  }

  function searchClose(refreshData) {
    modalSearch.hide();
    if (refreshData) loadData();
  }

  onMount(async () => {
    await tick();
    loadData();
  });
</script>

<caption
  class="flex pl-0 pr-3 items-center justify-between flex-col sm:flex-row bg-secondaryColor text-white min-w-[320px] border py-1 border-gray-900 rounded-t"
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
          class="absolute bg-secondaryColor z-10 border border-t-0 px-1 py-1 border-gray-900"
        >
          <li class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
            <button class="flex items-center" on:click={newProduct}>
              <i class="material-icons text-teal-700">add_circle</i>
              <span class="ml-2">Nuevo Producto</span>
            </button>
          </li>
          <li class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
            <button class="w-full" on:click={importMl}>Importar ML</button>
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
    <div>
      <button on:click={() => modalSearch.show()}
        ><i class="material-icons text-teal-500">search</i></button
      >
      <button on:click={resetSearch}
        ><i
          class="{ifSearch === -1
            ? 'hidden'
            : ''} ml-4 material-icons text-red-500">search_off</i
        ></button
      >
      <button />
    </div>
    <div class="ml-4 w-40 relative">
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
      <th>Sku</th>
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
        <td>{product.seller_custom_field}</td>
        <td
          ><p class="bg-blue-100 rounded">
            {traduction(product.status)}
          </p>
          {#if product.prodMl}
            <p class="mt-1 bg-yellow-50 rounded">
              {traduction(product.prodMl.status)}
            </p>
          {/if}
        </td>
        <td
          ><p class="bg-blue-100 rounded">${product.price}</p>
          {#if product.prodMl}
            <p class="mt-1 bg-yellow-50 rounded">${product.prodMl.price}</p>
          {/if}
        </td>
        <td>{product.title}</td>
        <td>
          <div class="flex items-center justify-between">
            <button on:click={handleDetail(product)} id={product.id}
              ><i class="ml-1 px-1 material-icons text-blue-600 text-lg"
                >visibility</i
              ></button
            >
            <button on:click={handleEdit(product)} id={product.id}
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

<Modal2 width="w-11/12 lg:w-1/2" bind:this={modalDelete}>
  <ModalDelProd {currentProd} {hideModalDelete} />
</Modal2>

<Modal2 width="w-11/12 lg:w-1/2" bind:this={modalMassive}>
  <ModalMassiveAction items={selItems} {action} {hideModalMassive} />
</Modal2>

<Modal2 width="w-11/12 lg:w-3/4" bind:this={modalProductDetail}>
  <ProductDetail {currentProd} />
</Modal2>

<Modal2 width="w-11/12 lg:w-3/4" bind:this={modalSearch}>
  <ModalSearch {search} {setSearch} {searchClose} />
</Modal2>
