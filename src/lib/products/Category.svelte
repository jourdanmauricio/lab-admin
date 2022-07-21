<script>
  import Modal2 from "./../Modal2.svelte";
  import SearchCategory from "./SearchCategory.svelte";
  import { newProduct } from "../../store/stores";

  // export let setProperty;
  export let category;

  let modalSearchCat;

  function hideModalSearchCat(cat) {
    category = cat;
    newProduct.updateProduct({ category_id: cat.id });
    // setProperty({ category_id: cat.id });
    modalSearchCat.hide();
  }
</script>

<div class="relative col-span-8">
  <div class={!category.fullName ? "input-oval h-[33px]" : "input-oval"}>
    {category.fullName || ""}
  </div>
  <label class="label-oval" for="name">Categoría</label>
</div>

<div class="relative col-span-3">
  <input
    disabled
    class="input-oval"
    type="search"
    name="sku"
    bind:value={category.id}
  />
  <label class="label-oval" for="sku">Cat Id</label>
</div>
<button class="col-span-1" on:click={() => modalSearchCat.show()}
  ><i class="material-icons">search</i></button
>

<Modal2 width="w-11/12 lg:w-3/4" bind:this={modalSearchCat}>
  <SearchCategory {hideModalSearchCat} />
</Modal2>
