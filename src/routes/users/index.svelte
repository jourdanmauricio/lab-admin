<script>
  import { postUser } from "./../../services/api/user.js";
  import Pagination from "./../../lib/Pagination.svelte";
  import Modal2 from "./../../lib/Modal2.svelte";
  import Spinner from "./../../lib/Spinner.svelte";
  import { settings } from "./../../store/stores";
  import { credentials, notification } from "./../../store/stores.js";
  import { variables } from "$lib/variables";
  import { onMount, tick } from "svelte";
  import { validateFields } from "./../../helpers/validateFileds";
  import { postSetting } from "../../services/api/settings.js";

  let modalDelete;
  let modalCreate;
  let isLoading = false;

  let users = [];
  let search = null;
  let pagination = {
    limit: $settings.itemsxpage,
    offset: 0,
  };
  let errors = {};
  let currentUser = null;

  async function deleteUser(id) {
    console.log("Delete", id);
    isLoading = true;
    try {
      const res = await fetch(`${variables.basePath}/users/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${$credentials.token}`,
        },
      });
      const data = await res.json();
      if (res.status === 201) {
        notification.show(`Usuario eliminado`, "success");
        loadData();
        //users = users.filter((user) => user.id !== parseInt(data.id));
        modalDelete.hide();
      } else {
        let message = "";
        message = res.statusText
          ? `${res.status}: ${res.statusText}`
          : "Error creando usuario 😞";
        throw message;
      }
    } catch (err) {
      notification.show(err, "error");
    } finally {
      isLoading = false;
    }
  }

  async function createUser(event) {
    const formData = new FormData(event.target);
    const formUser = {};
    for (const [key, value] of formData.entries()) {
      formUser[key] = value;
    }
    /* isPassword, isConfirmPassword, isEmail, isName, isPhone, isDocument, none */
    formData.append("email", "isEmail");
    formData.append("password", "isPassword");
    formData.append("role", "isName");
    errors = validateFields(formData);

    if (Object.keys(errors).length === 0) {
      isLoading = true;
      try {
        const res = await postUser(formUser);
        if (res.newUser.role === "admin") {
          const data = {
            user_id: res.newUser.id,
            setting: {
              status: "",
              listingType: "",
              condition: "",
              hintSku: false,
            },
          };
          postSetting(data);
        }
        notification.show("Usuario Creado", "success");
        loadData();
        modalCreate.hide();
      } catch (err) {
        notification.show(err, "error");
      } finally {
        isLoading = false;
      }
    }
  }

  function refreshData(pag) {
    pagination = pag;
    loadData();
  }

  async function loadData() {
    try {
      isLoading = true;
      let url = `${variables.basePath}/users?limit=${pagination.limit}&offset=${pagination.offset}`;
      if (search) url += `&q=${search}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${$credentials.token}`,
        },
      });
      let data = await response.json();
      console.log("data", data);
      users = data.results;
      pagination = {
        limit: data.paging.limit,
        offset: data.paging.offset,
        total: data.paging.total,
        results: data.results.length,
      };
    } catch (error) {
      notification.show(error, "error");
      console.error(`Error in load function for /: ${error}`);
    } finally {
      isLoading = false;
    }
  }

  function handleDelete(user) {
    currentUser = user;
    if (user.role === "superadmin") {
      notification.show("No se puede eliminar user superadmin", "error");
      return;
    }
    modalDelete.show();
  }

  function resetFieldError(e) {
    delete errors[e.target.name];
    errors = errors;
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

  onMount(async () => {
    await tick();
    pagination = {
      limit: $settings.itemsxpage,
      offset: 0,
    };

    loadData();
  });
</script>

{#if isLoading}
  <Spinner />
{/if}

{#if !$credentials.role}
  <!-- <Spinner /> -->
{:else if $credentials.role !== "superadmin"}
  <h1>Acceso no autorizado</h1>
{:else}
  <caption
    class="flex items-center justify-between flex-col sm:flex-row bg-secondaryColor text-white min-w-[320px] border px-10 py-1 border-gray-900 "
  >
    <div class="flex">
      <i
        on:click={() => exportTableToExcel("tblData")}
        class="material-icons text-green-700 active:text-gray-300 cursor-pointer"
        >file_download</i
      >
      <span class="text-lg ml-1">Usuarios: {pagination.total}</span>
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
        <th>Email</th>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Role</th>
        <th>Teléfono</th>
        <th>Documento</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {#each users as user}
        <tr>
          <td>{user.id}</td>
          <td>{user.email}</td>
          <td>{user.customer ? user.customer.name : ""}</td>
          <td>{user.customer ? user.customer.lastName : ""}</td>
          <td>{user.role}</td>
          <td>{user.customer ? user.customer.phone : ""}</td>
          <td>{user.customer ? user.customer.documentNumber : ""}</td>
          <td
            ><button on:click={handleDelete(user)} id={user.id}
              ><i class="material-icons bg-red-700">delete</i></button
            ></td
          >
        </tr>
      {/each}
    </tbody>
  </table>
  {#if pagination.total}
    <Pagination {refreshData} {pagination} />
  {/if}
{/if}

<Modal2 bind:this={modalDelete}>
  <h2 class="text-2xl text-center">
    Eliminar usuario {currentUser.customer ? currentUser.customer.name : ""}
    {currentUser.customer ? currentUser.customer.lastName : ""}
  </h2>
  <div class="py-4">
    <div class="w-full border-t border-gray-900" />
  </div>

  <p class="mt-5 min-w-[350px]">Está seguro de eliminar el usuario?</p>
  <p>{currentUser.email}</p>
  <p>Role: {currentUser.role}</p>

  <div class="mt-10 flex justify-between">
    <button
      class="ripple rounded bg-red-900 text-white py-1 px-10 "
      on:click={deleteUser(currentUser.id)}>Eliminar</button
    >
    <button class="ripple btn" on:click={() => modalDelete.hide()}
      >Cancelar</button
    >
  </div>
</Modal2>

<Modal2 bind:this={modalCreate}>
  <div class="w-[50vw] min-w-fit">
    <h2 class="text-2xl text-center">Crear usuario</h2>
    <div class="py-4">
      <div class="w-full border-t border-gray-900" />
    </div>
    <form on:submit|preventDefault={createUser}>
      <div class="relative mt-10">
        <input
          class="input-oval min-w-[250px]"
          type="email"
          name="email"
          on:input={resetFieldError}
          required="required"
        />
        <label class="label-oval" for="email">Email</label>
        {#if errors.email}
          <p class="error">
            <small style="color: red"> {errors.email} </small>
          </p>
        {/if}
      </div>
      <div class="relative mt-10">
        <input
          class="input-oval"
          type="password"
          name="password"
          on:input={resetFieldError}
          required="required"
        />
        <label class="label-oval" for="password">Password</label>
        {#if errors.password}
          <p class="error">
            <small style="color: red"> {errors.password} </small>
          </p>
        {/if}
      </div>
      <div class="relative mt-10">
        <select class="input-oval" name="role" id="role">
          <option value="admin">Admin</option>
          <option value="customer">Customer</option>
          <option value="seller">Seller</option>
        </select>
        <label class="label-oval" for="role">Role</label>
        {#if errors.role}
          <p class="error">
            <small style="color: red"> {errors.role} </small>
          </p>
        {/if}
      </div>
      <div class="mt-10 flex justify-between">
        <button
          type="reset"
          class="btn ripple"
          on:click={() => modalCreate.hide()}>Cancelar</button
        >
        <button class="btn ripple">Crear</button>
      </div>
    </form>
  </div></Modal2
>

<style>
  /*	Label the data 	*/
  @media only screen and (max-width: 1024px) {
    td:nth-of-type(1):before {
      content: "Id";
    }
    td:nth-of-type(2):before {
      content: "Email";
    }
    td:nth-of-type(3):before {
      content: "Nombre";
    }
    td:nth-of-type(4):before {
      content: "Apellido";
    }
    td:nth-of-type(5):before {
      content: "Role";
    }
    td:nth-of-type(6):before {
      content: "Teléfono";
    }
    td:nth-of-type(6):before {
      content: "Documento";
    }
    td:nth-of-type(7):before {
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
