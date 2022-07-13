<script>
  import Spinner from "./../../lib/Spinner.svelte";
  import { page } from "$app/stores";
  import { replaceCode } from "./../../services/api/userMl.js";
  import { onMount } from "svelte";
  import { notification } from "../../store/stores";

  const code = $page.url.searchParams.get("code");
  const state = $page.url.searchParams.get("state");
  let data = null;

  let isLoading = true;

  onMount(async () => {
    try {
      data = await replaceCode(code, state);
      console.log("data", data);
    } catch (error) {
      notification.show(error, "error");
    } finally {
      isLoading = false;
    }
  });
</script>

<h1>Estamos sincronizando con Mercado Libre....</h1>
<br /><br />
<p>{code}</p>
<p>{state}</p>

{data}

{#if isLoading}
  <Spinner />
{/if}
