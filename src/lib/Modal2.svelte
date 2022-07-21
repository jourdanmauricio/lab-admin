<script>
  import { fade } from "svelte/transition";
  export let width = "";

  let shown = false;

  export function show() {
    shown = true;
  }
  export function hide() {
    shown = false;
  }
</script>

<svelte:window
  on:keydown={(e) => {
    if (e.key === "Escape") {
      hide();
    }
  }}
/>

{#if shown}
  <div
    on:click={() => hide()}
    transition:fade
    class="w-screen h-full fixed top-0 left-0 flex justify-center items-start bg-gray-900 opacity-95 z-10"
  >
    <!-- h-full -->
    <div
      transition:fade
      on:click|stopPropagation
      class="mt-10 {width} bg-gray-200 text-black rounded-md px-8 py-10 relative opacity-95"
    >
      <span
        on:click={() => hide()}
        class="absolute top-2 right-4 text-4xl cursor-pointer text-gray-900 hover:-translate-y-0.5 transition-transform"
        >&times;</span
      >
      <slot />
    </div>
  </div>
{/if}
