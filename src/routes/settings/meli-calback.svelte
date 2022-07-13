<script>
  import Spinner from "./../../lib/Spinner.svelte";
  import { page } from "$app/stores";

  const code = $page.url.searchParams("code");
  const state = $page.url.searchParams("state");

  let isLoading = true;
</script>

{#if isLoading}
  <Spinner />
{/if}
