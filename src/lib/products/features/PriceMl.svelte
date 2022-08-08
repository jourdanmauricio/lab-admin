<script>
  import { product } from "../../../store/stores";

  $: price = $product.prodMl.price || "";
</script>

<div class="relative">
  <input
    on:change={(e) => product.update({ price_ml: parseFloat(e.target.value) })}
    value={price}
    class="input-oval"
    type="number"
    name="price"
    pattern="^\d*(\.\d{(0, 2)})?$"
    step="any"
    min="0"
    required
  />
  <label class="label-oval" for="price">Precio</label>
</div>
