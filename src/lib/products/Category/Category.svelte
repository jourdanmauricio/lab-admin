<script>
  import { product } from "../../../store/stores";
  import Modal2 from "../../Modal2.svelte";
  import SearchCategory from "../../products/Category/SearchCategory.svelte";

  let modalSearchCat;

  function hideModalSearchCat(cat) {
    product.update({ category: cat });
    product.update({ category_id: cat.id });
    product.update({ attributes: [] });
    product.update({ variations: [] });
    modalSearchCat.hide();
  }
</script>

<div class="relative col-span-8">
  <div
    class={!$product.category.full_name ? "input-oval h-[33px]" : "input-oval"}
  >
    {$product.category.full_name || ""}
  </div>
  <label class="label-oval" for="name">Categoría</label>
</div>

<div class="relative col-span-3">
  <input
    disabled
    class="input-oval"
    type="search"
    name="sku"
    value={$product.category_id}
  />
  <!-- bind:value={category.id} -->
  <label class="label-oval" for="sku">Cat Id</label>
</div>
<button class="col-span-1" on:click={() => modalSearchCat.show()}
  ><i class="material-icons text-teal-600 btn-rounded">search</i></button
>

<Modal2 width="w-11/12 lg:w-3/4" bind:this={modalSearchCat}>
  <SearchCategory {hideModalSearchCat} />
</Modal2>
