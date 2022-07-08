<script>
  import { page } from "$app/stores";
  import { isLogged, credentials, notification } from "../store/stores.js";
  import { goto } from "$app/navigation";

  export let fullDisplay;

  const nav = [
    {
      title:
        "<i class='material-icons' style='color: yellow;'>notifications</i>",
      path: "/about",
    },
    // {
    //   title: "<i class='material-icons' style='color: red;'>person</i>",
    //   path: "/contact",
    // },
  ];
  $: currentPage = $page.url.pathname;

  function logout() {
    localStorage.removeItem("user");
    isLogged.logout();
    credentials.setCredentials({});
    goto("/");
  }
</script>

<nav
  class="bg-gray-900 h-12 pl-5 flex items-center justify-between shadow-[0_2px_10px_2px_rgba(0,0,0,0.9)]"
>
  <div>
    <input type="checkbox" class="hidden" id="check" />
    <label
      for="check"
      on:click={fullDisplay}
      class="text-3xl text-white cursor-pointer"
    >
      <i class="material-icons">menu</i>
    </label>

    <a href="/dashboard" class="enlace">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <span class="text-white px-10 py-0 hidden sm:inline text-sm sm:text-3xl"
        >Integriprod</span
      >
    </a>
  </div>
  <div><h1>{currentPage}</h1></div>
  <ul class="flex">
    {#each nav as item}
      <li>
        <a
          class="mr-4"
          class:active={$page.url.pathname === "/about"}
          href="/about">{@html item.title}</a
        >
      </li>
    {/each}
    <li>
      <button class="mr-4" on:click={logout}>
        <i class="material-icons" style="color: red;">logout</i>
      </button>
    </li>
  </ul>
</nav>
