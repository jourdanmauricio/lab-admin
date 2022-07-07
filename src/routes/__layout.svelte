<script>
  import { onMount } from "svelte";
  import "../app.css";

  onMount(() => {
    console.log("Mount layout");
  });
</script>

<slot />
