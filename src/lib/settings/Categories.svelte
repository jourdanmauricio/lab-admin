<script>
  import {
    searchPredictor,
    getApiCategoriesMl,
  } from "./../../services/api/categoriesML.js";
  import {
    deleteCategory,
    getCategories,
    createCategories,
  } from "./../../services/api/categories.js";
  import { notification } from "./../../store/stores";
  import Spinner from "./../../lib/Spinner.svelte";
  import Pagination from "./../../lib/Pagination.svelte";
  import Modal2 from "./../../lib/Modal2.svelte";
  import { settings } from "./../../store/stores.js";
  import { onMount, tick } from "svelte";

  let modalDelete;
  let modalCreate;
  let categories = [];
  let search = null;

  let pagination = {
    limit: $settings.itemsxpage,
    offset: 0,
  };
  let currentCat = null;

  let isLoading = false;
  let results = [];
  let cat = null;

  async function predictor(e) {
    if (!e.target.value.trim()) {
      currentCat = null;
      cat = null;
      results = [];
      return;
    }

    e.target.blur();
    isLoading = true;
    try {
      results = await searchPredictor(e.target.value);
    } catch (err) {
      notification.show(err, "error");
    } finally {
      isLoading = false;
    }
  }

  async function crear() {
    if (!cat) {
      notification.show("Seleccione una categoría", "warning");
      return;
    }
    try {
      isLoading = true;
      const newCategories = await getApiCategoriesMl([cat.id]);
      await createCategories(newCategories);
      notification.show("Categoría creada", "success");
      currentCat = null;
      cat = null;
      results = [];
      loadData();
      modalCreate.hide();
    } catch (err) {
      notification.show(err, "error");
    } finally {
      isLoading = false;
    }
  }
  onMount(async () => {
    await tick();
    loadData();
  });
  async function loadData() {
    try {
      isLoading = true;
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
      isLoading = false;
    }
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
  function handleDelete(cat) {
    currentCat = cat;
    modalDelete.show();
  }

  function refreshData(pag) {
    pagination = pag;
    loadData();
  }

  async function delCategory(id) {
    isLoading = true;
    try {
      await deleteCategory(id);
      notification.show(`Categoría eliminada`, "success");
      loadData();
      modalDelete.hide();
    } catch (err) {
      notification.show(err, "error");
    } finally {
      isLoading = false;
    }
  }
</script>

<caption
  class="flex items-center justify-between mt-10 flex-col sm:flex-row bg-secondaryColor text-white min-w-[320px] border px-10 py-1 border-gray-900 "
>
  <div class="flex">
    <i
      on:click={() => exportTableToExcel("tblData")}
      class="material-icons text-green-700 active:text-gray-300 cursor-pointer"
      >file_download</i
    >
    <span class="text-lg ml-1">Categorías: {pagination.total}</span>
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
  <button on:click={() => modalCreate.show()}
    ><i class="material-icons mt-1 text-teal-700">add_circle</i></button
  >
</caption>

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
        <td>{category.fullName}</td>
        <td
          ><button on:click={handleDelete(category)} id={category.id}
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
    Eliminar Categoría {currentCat.id} - {currentCat.name}
  </h2>
  <div class="py-4">
    <div class="w-full border-t border-gray-900" />
  </div>

  <p class="mt-5 min-w-[350px]">Está seguro de eliminar la categoría?</p>

  <!-- Image -->

  <div class="mt-10 flex justify-between">
    <button
      class="ripple rounded bg-red-900 text-white py-1 px-10 "
      on:click={delCategory(currentCat.id)}>Eliminar</button
    >
    <button class="ripple btn" on:click={() => modalDelete.hide()}
      >Cancelar</button
    >
  </div>
</Modal2>

<Modal2 bind:this={modalCreate}>
  <div class="w-[80vw]">
    <h2 class="text-2xl text-center">Crear categoría</h2>
    <div class="py-4">
      <div class="border-t border-gray-900" />
    </div>

    <div class="relative mt-4">
      <input
        class="input-oval"
        type="text"
        name="description"
        required="required"
        on:keydown={(e) => {
          if (e.key === "Enter") predictor(e);
        }}
        on:blur={predictor}
      />
      <label class="label-oval" for="description">Descripción</label>
    </div>

    <!-- {results} -->
    {results.length}

    {#if results.length > 0}
      <select
        class="block ml-auto mr-auto justify-center mt-4 w-fit border bg-transparent overflow-y-hidden"
        name="catPredictor"
        id="catPredictor"
        size={results.length + 1}
        bind:value={cat}
      >
        <option
          disabled
          class="border border-gray-600 border-solid"
          value="false">Seleccione una categoría</option
        >
        {#each results as category}
          <option
            class="h-fit whitespace-normal border border-gray-600 border-solid"
            value={category}
          >
            {#each category.pathFromRoot as parent, index}
              {#if index === 0}
                {parent.name}
              {:else}
                &nbsp;/&nbsp;{parent.name}
              {/if}
            {/each}
          </option>
        {/each}
      </select>
      <div class="flex justify-between mt-4">
        <button
          class="btn ripple block"
          on:click={() => {
            modalCreate.hide();
            currentCat = null;
            cat = null;
            results = [];
          }}>Cancelar</button
        >
        <button class="btn ripple block" on:click={crear}
          >Crear categoría</button
        >
      </div>
    {/if}

    {#if isLoading}
      <Spinner />
    {/if}
  </div>
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
