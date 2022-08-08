<script>
  import { fade } from "svelte/transition";
  import {
    getApiAllCategoriesMl,
    getApiCategoriesMl,
  } from "../../../services/api/categoriesML";
  import { onMount } from "svelte";
  import { notification, loading } from "../../../store/stores";

  export let hideModalSearchCat;

  let categories = [];

  async function handleSelectCat(category) {
    if (category.children_categories.length === 0) {
      hideModalSearchCat(category);
    }
    try {
      loading.show(true);
      category = await getApiCategoriesMl([category.id]);
      let newCategories = [];
      category[0].children_categories.map((cat) => newCategories.push(cat.id));
      categories = await getApiCategoriesMl(newCategories);
    } catch (error) {
      console.log("error", error);
    } finally {
      loading.show(false);
    }
  }

  async function loadPpal() {
    loading.show(true);
    try {
      categories = await getApiAllCategoriesMl();
      categories.map((cat) => (cat.children_categories = [1]));
      console.log("categories", categories);
    } catch (error) {
      console.log("error", error);
      notification.show(error);
    } finally {
      loading.show(false);
    }
  }
  onMount(async () => {
    loadPpal();
  });
</script>

{#if categories.length > 0}
  <div class="text-center">
    <div class="mt-4 h-[345px] flex justify-center">
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
            <div class="flex min-w-[380px] justify-between">
              <label class="cursor-pointer" for={category.id}
                >{category.name}</label
              >
              {#if category.children_categories.length > 0}
                <i class="material-icons">chevron_right</i>
              {:else}
                <i class="material-icons">check</i>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    </div>
    <button on:click={loadPpal} class="mt-4 btn ripple">Reset</button>
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
