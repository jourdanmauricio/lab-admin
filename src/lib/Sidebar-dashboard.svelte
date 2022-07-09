<script>
  import { page } from "$app/stores";
  import { credentials } from "../store/stores.js";

  // const nav = [
  //   { title: "Perfil", path: "/profile", role="" },
  //   { title: "About", path: "/about" },
  //   { title: "Contact", path: "/contact" },
  // ];
</script>

<!-- .btn.active,
.btn:hover {
  background-color: var(--secondary-color);
  transition: 0.5s;
} -->

<nav class="bg-gray-900 h-full">
  <ul class="menu text-white flex flex-col">
    <li class="mt-4">
      <a
        class="flex rounded text-white py-1 pl-5 bg-transparent hover:bg-secondaryColor {$page
          .url.pathname === '/dashboard'
          ? 'bg-secondaryColor'
          : 'transparent'}"
        href="/dashboard"
        ><i class="material-icons">dashboard</i><span class="ml-2"
          >Dashboard</span
        ></a
      >
    </li>
    <li class="mt-4">
      <a
        class="flex rounded text-white py-1 pl-5 bg-transparent hover:bg-secondaryColor {$page
          .url.pathname === '/profile'
          ? 'bg-secondaryColor'
          : 'transparent'}"
        href="/profile"
        ><i class="material-icons">person</i><span class="ml-2">Perfil</span></a
      >
    </li>
    <li class="mt-4">
      <a
        class="flex rounded text-white py-1 pl-5 bg-transparent hover:bg-secondaryColor {$page
          .url.pathname === '/setings'
          ? 'bg-secondaryColor'
          : 'transparent'}"
        href="/settings"
        ><i class="material-icons text-gray-500">settings</i><span class="ml-2"
          >Configuración</span
        ></a
      >
    </li>
    <li class="mt-4">
      <a
        class="flex rounded text-white py-1 pl-5 bg-transparent hover:bg-secondaryColor {$page
          .url.pathname === '/products'
          ? 'bg-secondaryColor'
          : 'transparent'}"
        href="/products"
        ><i class="material-icons" style="color: teal;">stars</i><span
          class="ml-2">Productos</span
        ></a
      >
    </li>
    {#if $credentials.role === "superadmin"}
      <li class="mt-4  ">
        <a
          class="flex rounded text-white py-1 pl-5 bg-transparent hover:bg-secondaryColor {$page
            .url.pathname === '/users'
            ? 'bg-secondaryColor'
            : 'transparent'}"
          href="/users"
          ><i class="material-icons">group</i><span class="ml-2">Usuarios</span
          ></a
        >
      </li>
    {/if}
  </ul>
</nav>
