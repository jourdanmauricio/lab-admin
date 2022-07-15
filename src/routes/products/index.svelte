<script>
  import {
    getApiProductsMl,
    getApiItemsMl,
  } from "../../services/api/productsMl";
  import { notification } from "../../store/stores";
  async function importMl() {
    try {
      const mlItemsId = await getApiItemsMl();

      console.log("Items", mlItemsId);
      const mlProducts = await getApiProductsMl(mlItemsId.results);
      console.log("mlProducts", mlProducts);
    } catch (error) {
      notification.show(error, "error");
    }
  }
</script>

<h1 class="text-purple-800">Productos</h1>

<button on:click={importMl} class="btn ripple">Import ML</button>
