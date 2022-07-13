<script>
  import Spinner from "./../../lib/Spinner.svelte";
  import { page } from "$app/stores";

  const code = $page.url.searchParams.get("code");
  const state = $page.url.searchParams.get("state");

  let isLoading = true;
</script>

<h1>Estamos sincronizando con Mercado Libre....</h1>
<br /><br />
<p>{code}</p>
<p>{state}</p>

{#if isLoading}
  <Spinner />
{/if}
