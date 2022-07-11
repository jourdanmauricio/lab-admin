<script>
  import { credentials, notification } from "./../../store/stores";
  import Spinner from "./../../lib/Spinner.svelte";
  import { variables } from "$lib/variables";
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
      const res = await fetch(
        `https://api.mercadolibre.com/sites/MLA/domain_discovery/search?q=${e.target.value}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      if (data.length === 0) throw "Intenta con otra palabra";
      if (res.status === 200) {
        results = await Promise.all(
          data.map((cat) =>
            fetch(
              `https://api.mercadolibre.com/categories/${cat.category_id}`
            ).then((res) => res.json())
          )
        );
        console.log("Resutlado", results);
      } else {
        let message = "";
        message = res.statusText
          ? `${res.status}: ${res.statusText}`
          : "Error obteniendo categorías 😞";
        throw message;
      }
    } catch (err) {
      notification.show(err, "error");
    } finally {
      isLoading = false;
    }
  }

  async function getAtribs() {
    const urls = [
      `https://api.mercadolibre.com/categories/${cat.id}/attributes`,
      `https://api.mercadolibre.com/categories/${cat.id}/technical_specs/input`,
    ];
    try {
      isLoading = true;
      const atribs = await Promise.all(
        urls.map((url) => fetch(url).then((res) => res.json()))
      );
      return atribs;
    } catch (error) {
      console.log(error);
      notification.show(error, "error");
    } finally {
      isLoading = false;
    }
  }
  async function crear() {
    if (!cat) {
      notification.show("Seleccione una categoría", "warning");
      return;
    }
    const atribs = await getAtribs();

    let fullName = "";
    cat.path_from_root.forEach((parent, index) => {
      fullName += index === 0 ? parent.name : ` / ${parent.name}`;
    });

    const newCategory = {
      mlId: cat.id,
      name: cat.name,
      fullName: fullName,
      pathFromRoot: cat.path_from_root,
      settings: cat.settings,
      attributes: atribs[0],
      attributes_oblg: atribs[1],
    };
    if (cat.picture) newCategory.picture = cat.picture;
    try {
      const res = await fetch(`${variables.basePath}/categories`, {
        method: "POST",
        body: JSON.stringify(newCategory),
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${$credentials.token}`,
        },
      });
      const data = await res.json();
      if (res.status === 201) {
        notification.show("Categoría creada", "success");
        currentCat = null;
        cat = null;
        results = [];
        loadData();
        modalCreate.hide();
      } else {
        let message = "";
        message = res.statusText
          ? `${res.status}: ${res.statusText}`
          : "Error creando la categoría 😞";
        throw message;
      }
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
      let url = `${variables.basePath}/categories?limit=${pagination.limit}&offset=${pagination.offset}`;
      if (search) url += `&q=${search}`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await res.json();
      if (res.status === 200) {
        console.log("data", data);
        categories = data.results;
        pagination = {
          limit: data.paging.limit,
          offset: data.paging.offset,
          total: data.paging.total,
          results: data.results.length,
        };
      } else {
        let message = "";
        message = res.statusText
          ? `${res.status}: ${res.statusText}`
          : "Error actualizando el perfil 😞";
        throw message;
      }
    } catch (error) {
      notification.show(error, "error");
      console.error(`Error recuperando las categorías: ${error}`);
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

  async function deleteCategory(id) {
    console.log("Delete", id);
    isLoading = true;
    try {
      const res = await fetch(`${variables.basePath}/categories/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${$credentials.token}`,
        },
      });
      const data = await res.json();
      if (res.status === 201) {
        notification.show(`Categoría eliminada`, "success");
        loadData();
        modalDelete.hide();
      } else {
        let message = "";
        message = res.statusText
          ? `${res.status}: ${res.statusText}`
          : "Error eliminando la categoría 😞";
        throw message;
      }
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
      <th>Id</th>
      <th>ML ID</th>
      <th>Categoría</th>
      <th>Acciones</th>
    </tr>
  </thead>
  <tbody>
    {#each categories as category}
      <tr>
        <td>{category.id}</td>
        <td>{category.mlId}</td>
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
    Eliminar Categoría {currentCat.mlId} - {currentCat.name}
  </h2>
  <div class="py-4">
    <div class="w-full border-t border-gray-900" />
  </div>

  <p class="mt-5 min-w-[350px]">Está seguro de eliminar la categoría?</p>

  <!-- Image -->

  <div class="mt-10 flex justify-between">
    <button
      class="ripple rounded bg-red-900 text-white py-1 px-10 "
      on:click={deleteCategory(currentCat.id)}>Eliminar</button
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
          if (e.key === "Enter" || e.key === "Tab") predictor(e);
        }}
        on:blur={predictor}
      />
      <label class="label-oval" for="description">Descripción</label>
    </div>

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
            {#each category.path_from_root as parent, index}
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
      content: "ML ID";
    }
    td:nth-of-type(3):before {
      content: "Categoría";
    }
    td:nth-of-type(4):before {
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
