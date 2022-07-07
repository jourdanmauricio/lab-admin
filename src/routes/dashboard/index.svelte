<script>
  import { isLogged, credentials, notification } from "./../../store/stores";
  import { goto } from "$app/navigation";
  function logout() {
    localStorage.removeItem("user");
    isLogged.logout();
    credentials.setCredentials({});
    goto("/");
  }
</script>

<h1 class="text-purple-800">-Dashboard</h1>

<button class="btn" on:click={logout}>Logout</button>
