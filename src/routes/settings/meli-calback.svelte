<script>
  import Spinner from "./../../lib/Spinner.svelte";
  import { page } from "$app/stores";

  const code = $page.url.searchParams("code");
  const state = $page.url.searchParams("state");

  let isLoading = true;
</script>

<h1>Estamos sincronizando con Mercado Libre....</h1>

{#if isLoading}
  <Spinner />
{/if}
