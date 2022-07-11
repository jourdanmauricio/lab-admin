<script>
  import { onMount } from "svelte";
  import { settings } from "./../../store/stores";

  onMount(() => {
    console.log("Mount layout dashboard");
  });
</script>

{#if $settings.itemsxpage}
  <slot />
{/if}
