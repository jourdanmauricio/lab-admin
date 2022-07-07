<script>
  import Spinner from "./../../lib/Spinner.svelte";
  import { credentials, notification } from "./../../store/stores.js";
  import { variables } from "$lib/variables";
  import { onMount, tick } from "svelte";

  // import { isLogged, credentials, notification } from "./../../store/stores.js";

  let isLoading = false;
  let users = [];

  onMount(async () => {
    await tick();
    console.log("MOUNT");
    try {
      isLoading = true;
      console.log("Token: ", $credentials.token);
      const response = await fetch(`${variables.basePath}/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${$credentials.token}`,
        },
      });
      console.log("res", response);

      users = await response.json();
      console.log("users", users);
    } catch (error) {
      notification.show(error, "error");
      console.error(`Error in load function for /: ${error}`);
    } finally {
      isLoading = false;
    }
  });

  function handleClick(e) {
    console.log("click", e.target);
  }
</script>

{#if isLoading}
  <Spinner />
{/if}

{#if $credentials.role !== "superadmin"}
  <h1>Acceso no autorizado</h1>
{:else}
  <h1>Users</h1>
  <table>
    <thead>
      <tr>
        <th>Id</th>
        <th>Email</th>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Role</th>
        <th>Teléfono</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {#each users as user}
        <tr>
          <td>{user.id}</td>
          <td>{user.email}</td>
          <td>{user.customer.name}</td>
          <td>{user.customer.lastName}</td>
          <td>{user.role}</td>
          <td>{user.customer.phone}</td>
          <td>Acciones</td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}

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
    td:nth-of-type(7):before {
      content: "Acciones";
    }
  }
</style>
