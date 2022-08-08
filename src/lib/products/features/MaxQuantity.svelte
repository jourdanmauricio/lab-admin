<script>
  import { product } from "../../../store/stores";

  $: saleTerm = $product.sale_terms.find(
    (saleTerm) => saleTerm.id === "PURCHASE_MAX_QUANTITY"
  );

  function updProduct(e) {
    let sale_terms = $product.sale_terms;

    let found = sale_terms.find((el) => el.id === "PURCHASE_MAX_QUANTITY");
    if (found) {
      found.value_name = e.target.value;
    } else {
      sale_terms.push({
        id: "PURCHASE_MAX_QUANTITY",
        value_name: e.target.value,
      });
    }

    product.update({ sale_terms: sale_terms });
  }
</script>

<div class="relative">
  <input
    on:change={updProduct}
    value={saleTerm ? saleTerm.value_name : ""}
    class="input-oval"
    type="number"
    name="maxQuantity"
    min="0"
    step="1"
    required
  />
  <label class="label-oval" for="maxQuantity">Cantidad máxima x compra</label>
</div>
