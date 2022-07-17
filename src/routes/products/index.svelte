<script>
  import { onMount, tick } from "svelte";
  import { getApiCategoriesMl } from "./../../services/api/categoriesML.js";
  import { settings } from "./../../store/stores.js";
  import { notification } from "../../store/stores";
  // import { createCategories } from "./../../services/api/categories.js";
  import { postproducts, deleteProduct } from "../../services/api/products.js";
  import {
    postproductsMl,
    getProductsMl,
    getApiProductsMl,
    getApiItemsMl,
  } from "../../services/api/productsMl.js";
  import Modal2 from "./../../lib/Modal2.svelte";
  import Spinner from "./../../lib/Spinner.svelte";
  import Pagination from "./../../lib/Pagination.svelte";
  import { getProducts } from "../../services/api/products";
  import { getAllCategories } from "../../services/api/categories";

  async function importMl() {
    try {
      const mlApiItemsId = await getApiItemsMl();
      const mlApiProducts = await getApiProductsMl(mlApiItemsId.results);
      const mlProducts = await getProductsMl();
      const allCategories = await getAllCategories();

      let newCategoriesId = [];
      let newItems = [];
      console.log("mlApiProducts", mlApiProducts);
      mlApiProducts.forEach((apiMlProd) => {
        const index = mlProducts.findIndex(
          (mlProd) => mlProd.id === apiMlProd.id
        );
        if (index === -1) newItems.push(apiMlProd);
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
      const newProducts = await postproducts(mlApiProducts);
      console.log("newProducts!!!!!!!!", newProducts);
      const newProductsMl = await postproductsMl(newProducts);
    } catch (error) {
      notification.show(error, "error");
    }
  }

  let modalDelete;
  let products = [];
  let search = null;

  let pagination = {
    limit: $settings.itemsxpage,
    offset: 0,
  };
  let currentProd = null;

  let isLoading = false;
  let results = [];
  let cat = null;

  onMount(async () => {
    await tick();
    loadData();
  });

  function refreshData(pag) {
    pagination = pag;
    loadData();
  }

  function handleDelete(prod) {
    currentProd = prod;
    modalDelete.show();
  }

  function exportTableToExcel(tableID, filename = "") {
    var downloadLink;
    var dataType = "application/vnd.ms-excel";
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, "%20");

    // Specify file name
    filename = filename ? filename + ".xls" : "excel_data.xls";

    // Create download link element
    downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
      var blob = new Blob(["\ufeff", tableHTML], {
        type: dataType,
      });
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      // Create a link to the file
      downloadLink.href = "data:" + dataType + ", " + tableHTML;

      // Setting the file name
      downloadLink.download = filename;

      //triggering the function
      downloadLink.click();
    }
  }

  async function loadData() {
    try {
      isLoading = true;
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
      console.log("ERRORRRR", error);
      notification.show(error, "error");
    } finally {
      isLoading = false;
    }
  }
  async function delProduct(id) {
    isLoading = true;
    try {
      await deleteProduct(id);
      notification.show(`Producto eliminada`, "success");
      loadData();
      modalDelete.hide();
    } catch (err) {
      notification.show(err, "error");
    } finally {
      isLoading = false;
    }
  }
</script>

{#if isLoading}
  <Spinner />
{/if}

<h1 class="text-purple-800">Productos</h1>

<button on:click={importMl} class="btn ripple">Import ML</button>

<caption
  class="flex items-center justify-between mt-10 flex-col sm:flex-row bg-secondaryColor text-white min-w-[320px] border px-10 py-1 border-gray-900 "
>
  <div class="flex">
    <i
      on:click={() => exportTableToExcel("tblData")}
      class="material-icons text-green-700 active:text-gray-300 cursor-pointer"
      >file_download</i
    >
    <span class="text-lg ml-1">Productos: {pagination.total}</span>
  </div>
  <div class="flex items-center">
    <input
      class="text-black w-[250px] pl-1"
      name="search"
      type="search"
      bind:value={search}
      on:blur={loadData}
    />
    <!-- <button disabled={!search} on:click={clean} class="disabled:hidden"
    ><i class="material-icons ml-1">cancel</i></button
  > -->
  </div>
  <!-- <button on:click={() => modalCreate.show()}
    ><i class="material-icons mt-1 text-teal-700">add_circle</i></button
  > -->
</caption>

<table id="tblData" class="responsive-table">
  <thead>
    <tr>
      <th>ID</th>
      <th>ML ID</th>
      <th>Categoría</th>
      <th>Acciones</th>
    </tr>
  </thead>
  <tbody>
    {#each products as product}
      <tr>
        <td>{product.id}</td>
        <td>{product.mlId}</td>
        <td>{product.name}</td>
        <td
          ><button on:click={handleDelete(product)} id={product.id}
            ><i class="material-icons" style="color: red">delete</i></button
          ></td
        >
      </tr>
    {/each}
  </tbody>
</table>

{#if pagination.total}
  <Pagination {refreshData} {pagination} />
{/if}

<Modal2 bind:this={modalDelete}>
  <h2 class="text-2xl text-center">
    Eliminar Categoría {currentProd.id} - {currentProd.name}
  </h2>
  <div class="py-4">
    <div class="w-full border-t border-gray-900" />
  </div>

  <p class="mt-5 min-w-[350px]">Está seguro de eliminar el producto?</p>

  <!-- Image -->

  <div class="mt-10 flex justify-between">
    <button
      class="ripple rounded bg-red-900 text-white py-1 px-10 "
      on:click={delProduct(currentProd.id)}>Eliminar</button
    >
    <button class="ripple btn" on:click={() => modalDelete.hide()}
      >Cancelar</button
    >
  </div>
</Modal2>
