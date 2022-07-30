<script>
  import { searchPredictor } from "./../../services/api/categoriesML.js";
  import { getApiCategoriesMl } from "./../../services/api/categoriesML.js";
  import { createCategories } from "../../services/api/categories.js";
  import { loading, notification } from "../../store/stores.js";

  export let handleCloseCreateCategory;

  let cat = null;
  let results = [];
  let currentCat = null;

  async function predictor(e) {
    if (!e.target.value.trim()) {
      currentCat = null;
      cat = null;
      results = [];
      return;
    }
    e.target.blur();
    loading.show(true);
    try {
      results = await searchPredictor(e.target.value);
      console.log("Results", results);
    } catch (err) {
      notification.show(err, "error");
    } finally {
      loading.show(false);
    }
  }

  async function crear() {
    if (!cat) {
      notification.show("Seleccione una categoría", "warning");
      return;
    }
    try {
      loading.show(true);
      const newCategories = await getApiCategoriesMl([cat.id]);
      await createCategories(newCategories);
      notification.show("Categoría creada", "success");
      currentCat = null;
      cat = null;
      results = [];
      handleCloseCreateCategory(true);
    } catch (err) {
      notification.show(err, "error");
    } finally {
      loading.show(false);
    }
  }
</script>

<div>
  <h2 class="text-2xl text-center">Crear categoría</h2>
  <div class="py-4">
    <div class="border-t border-gray-900" />
  </div>

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

  {#if results.length > 0}
    <select
      class="block ml-auto mr-auto justify-center mt-4 w-fit border bg-transparent overflow-y-hidden"
      name="catPredictor"
      id="catPredictor"
      size={results.length + 1}
      bind:value={cat}
    >
      <option disabled class="border border-gray-600 border-solid" value="false"
        >Seleccione una categoría</option
      >
      {#each results as category}
        <option
          class="h-fit whitespace-normal border border-gray-600 border-solid"
          value={category}
        >
          {#each category.path_from_root as parent, index}
            {#if index === 0}
              {parent.name}
            {:else}
              &nbsp;/&nbsp;{parent.name}
            {/if}
          {/each}
        </option>
      {/each}
    </select>
    <div class="flex justify-between mt-4">
      <button
        class="btn ripple block"
        on:click={() => {
          handleCloseCreateCategory(false);
          currentCat = null;
          cat = null;
          results = [];
        }}>Cancelar</button
      >
      <button class="btn ripple block" on:click={crear}>Crear categoría</button>
    </div>
  {/if}
</div>
