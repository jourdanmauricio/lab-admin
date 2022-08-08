<script>
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import { loading } from "../../../store/stores";
  import { getAllCategories } from "../../../services/api/categories";

  export let hideModalSearchCat;

  let categories = [];
  let search = "";

  onMount(async function () {
    try {
      loading.show(true);
      categories = await getAllCategories();
    } catch (error) {
      console.error(error);
    } finally {
      loading.show(false);
    }
  });
  function handleSelectCat(category) {
    hideModalSearchCat(category);
  }
</script>

{#if categories.length > 0}
  <div class="mt-4 h-[380px] flex justify-center">
    <div
      class="opt-container w-full overflow-hidden bg-secondaryColor text-whiteColor rounded-lg overflow-y-scroll"
    >
      <div class="mx-6 text-center my-4">
        <input
          class="p-1 w-full rounded text-black outline-gray-200"
          placeholder="Buscar"
          type="search"
          bind:value={search}
        />
      </div>
      {#each categories as category}
        <div
          in:fade
          class="{category.full_name
            .toLowerCase()
            .includes(search.toLowerCase())
            ? 'block'
            : 'hidden'} py-3 px-6 cursor-pointer hover:bg-gray-500"
          on:click={() => handleSelectCat(category)}
        >
          <input
            class="hidden"
            type="radio"
            id={category.id}
            name="categories"
          />
          <label class="cursor-pointer" for={category.id}
            >{category.full_name}</label
          >
        </div>
      {/each}
    </div>
  </div>
{/if}

<style>
  .opt-container::-webkit-scrollbar {
    width: 8px;
    background: #0d141f;
    border-radius: 0 8px 8px 0;
  }
  .opt-container::-webkit-scrollbar-thumb {
    background: #777;
    border-radius: 0 8px 8px 0;
  }
</style>
