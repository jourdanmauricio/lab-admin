<script>
  import { searchPredictor } from "./../../services/api/categoriesML.js";
  import { loading, notification } from "../../store/stores";
  import { fade } from "svelte/transition";

  export let hideModalSearchCat;

  let categories = [];

  async function predictor(e) {
    if (!e.target.value.trim()) {
      categories = [];
      return;
    }

    e.target.blur();
    loading.show(true);
    try {
      categories = await searchPredictor(e.target.value);
    } catch (err) {
      notification.show(err, "error");
    } finally {
      loading.show(false);
    }
  }
  function handleSelectCat(category) {
    hideModalSearchCat(category);
  }
</script>

<div class="relative mt-4">
  <input
    class="input-oval"
    type="text"
    name="description"
    required="required"
    on:keydown={(e) => {
      if (e.key === "Enter") predictor(e);
    }}
    on:blur={predictor}
  />
  <label class="label-oval" for="description">Descripción</label>
</div>

{#if categories.length > 0}
  <div class="mt-4 h-[340px] flex justify-center">
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
