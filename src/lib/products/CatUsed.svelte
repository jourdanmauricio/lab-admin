<script>
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import { loading } from "../../store/stores";
  import { getAllCategories } from "../../services/api/categories";

  export let hideModalSearchCat;

  let categories = [];

  onMount(async function () {
    try {
      loading.show(true);
      categories = await getAllCategories();
      console.log("categories", categories);
      // posts = response.data;
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

<div class="selected">Select Category</div>

{#if categories.length > 0}
  <div class="h-[380px] flex justify-center">
    <div
      class="opt-container overflow-hidden bg-secondaryColor text-whiteColor rounded-lg overflow-y-scroll"
    >
      <!-- opacity-0 max-h-0 -->
      {#each categories as category}
        <div
          in:fade
          class="py-3 px-6 cursor-pointer hover:bg-gray-500"
          on:click={() => handleSelectCat(category)}
        >
          <input
            class="hidden"
            type="radio"
            id={category.id}
            name="categories"
          />
          <label class="cursor-pointer" for={category.id}
            >{category.fullName}</label
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
