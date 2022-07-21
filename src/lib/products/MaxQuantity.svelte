<script>
  import { newProduct } from "../../store/stores";
  function updProduct(e) {
    let saleTerms = $newProduct.sale_terms;

    let found = saleTerms.find((el) => el.id === "PURCHASE_MAX_QUANTITY");
    if (found) {
      found.value_name = e.target.value;
    } else {
      saleTerms.push({
        id: "PURCHASE_MAX_QUANTITY",
        value_name: e.target.value,
      });
    }

    newProduct.updateProduct({ sale_terms: saleTerms });
  }
</script>

<div class="relative">
  <input
    on:blur={updProduct}
    class="input-oval"
    type="number"
    name="maxQuantity"
    min="0"
    step="1"
    required
  />
  <label class="label-oval" for="maxQuantity">Cantidad máxima x compra</label>
</div>
