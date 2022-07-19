<script>
  import Spinner from "./../lib/Spinner.svelte";
  import ApiMl from "../services/ApiMl";
  import Api from "../services/Api";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { isLogged, credentials, loading } from "../store/stores.js";
  import { settings } from "./../store/stores";
  import Footer from "../lib/Footer.svelte";
  import Snackbar from "../lib/Snackbar.svelte";
  import NavDashboard from "../lib/Nav-dashboard.svelte";
  import SidebarDashboard from "../lib/Sidebar-dashboard.svelte";

  let fullWidth = false;

  const fullDisplay = () => (fullWidth = !fullWidth);

  onMount(async () => {
    console.log("Mount Dashboard");
    if (!$isLogged) {
      const user = JSON.parse(localStorage.getItem("user"));
      const lsettings = localStorage.getItem("settings");
      if (user) {
        console.log("user", user);
        isLogged.login();
        credentials.setCredentials(user);
        Api.setAuth(user.token);
        if (user.userMl) {
          ApiMl.setAuth(user.userMl.accessToken);
        }
      } else {
        goto("/");
      }
      if (lsettings) {
        settings.setSettings(JSON.parse(lsettings));
      }
    }
  });
</script>

<Snackbar />

{#if $loading}
  <Spinner />
{/if}

<div class="g-content {fullWidth ? 'animate' : ''}">
  <div class="g-header">
    <NavDashboard {fullDisplay} />
  </div>

  <div class="g-side">
    <SidebarDashboard />
  </div>

  <div class="g-main">
    <slot />
  </div>

  <div class="g-footer">
    <Footer />
  </div>
</div>

<style>
  .g-content {
    background-color: azure;
    display: grid;
    height: 100vh;
    grid-template-columns: 180px minmax(0, 1fr);
    grid-template-rows: 45px 1fr 30px;
    grid-template-areas:
      "g-header g-header"
      "g-side g-main"
      "g-footer g-footer";
    overflow-x: hidden;
  }
  .g-header {
    grid-area: g-header;
  }
  .g-side {
    grid-area: g-side;
    transition: all 0.5s;
  }
  .g-main {
    grid-area: g-main;
    transition: all 0.5s;
    padding: 20px;
  }
  .g-footer {
    grid-area: g-footer;
  }
  .animate .g-main {
    width: calc(100% + 180px);
    transform: translateX(-180px);
  }
  .animate .g-side {
    transform: translateX(-180px);
  }
</style>
