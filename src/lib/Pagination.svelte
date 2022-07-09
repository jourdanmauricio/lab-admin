<script>
  // import { settings } from "./../store/settings.js";
  export let pagination;
  export let refreshData;

  let page;
  let itemsxpage = pagination.limit;

  if (pagination.offset === 0) {
    page = 1;
  } else {
    page = pagination.offset / itemsxpage + 1;
  }

  let pages = Math.ceil(pagination.total / itemsxpage);

  function changePage(e) {
    switch (e.target.name) {
      case "first":
        page = 1;
        break;
      case "prev":
        page--;
        break;
      case "next":
        page++;
        break;
      case "last":
        page = pages;
        break;
      case "page":
        page = e.target.value;
        break;
      case "itemsxpage":
        itemsxpage = e.target.value;
        page = 1;
        break;
    }

    const pag = { limit: itemsxpage, offset: (page - 1) * itemsxpage };
    refreshData(pag);
  }
</script>

<div class="flex flex-col sm:flex-row items-center justify-between">
  <div class="mt-4">
    <label for="itemsxpage">Cant x página</label>
    <select
      class="ml-2 border border-solid border-black  max-w-[80px]"
      name="itemsxpage"
      id="itemsxpage"
      required="required"
      on:change={changePage}
    >
      <option selected={itemsxpage === "10"} value="10">10</option>
      <option selected={itemsxpage === "30"} value="30">30</option>
      <option
        selected={itemsxpage === pagination.total.toString()}
        value={pagination.total}>Todos</option
      >
    </select>
  </div>
  <div class="mt-4">
    <button
      disabled={page === 1}
      class="ml-10 font-bold hover:underline disabled:text-gray-500 disabled:font-normal"
      on:click={changePage}
      name="first">&lt; &lt;</button
    >
    <button
      disabled={page === 1}
      class="ml-10 font-bold hover:underline disabled:text-gray-500 disabled:font-normal"
      on:click={changePage}
      name="prev">&lt;</button
    >
    <select
      disabled={pages === 1}
      class="ml-10 border border-solid border-black max-w-[50px]"
      name="page"
      id="page"
      required="required"
      on:change={changePage}
    >
      {#each Array(pages) as _, index (index)}
        <option selected={index === page - 1} value={index + 1}
          >{index + 1}</option
        >
      {/each}
    </select>

    <button
      disabled={page === pages}
      class="ml-10 font-bold hover:underline disabled:text-gray-500 disabled:font-normal"
      on:click={changePage}
      name="next">&gt;</button
    >
    <button
      disabled={page === pages}
      class="ml-10 font-bold hover:underline disabled:text-gray-500 disabled:font-normal"
      on:click={changePage}
      name="last">&gt; &gt;</button
    >
  </div>
</div>
