<script>
  import { settings } from "./../../store/stores";

  function changeItmesxPage(e) {
    settings.changeQuantity(e.target.value);
    localStorage.setItem("settings", JSON.stringify($settings));
  }
</script>

<div class="mt-5">
  <label for="itemsxpage"> Cantidad de filas x página </label>
  <select
    on:change={changeItmesxPage}
    class="ml-2 bg-transparent border border-solid border-gray-700"
    name="itemsxpage"
    id="itemsxpage"
  >
    <option selected={$settings.itemsxpage === "10"} value="10">10</option>
    <option selected={$settings.itemsxpage === "30"} value="30">30</option>
    <option selected={$settings.itemsxpage === "50"} value="50">50</option>
  </select>
</div>
