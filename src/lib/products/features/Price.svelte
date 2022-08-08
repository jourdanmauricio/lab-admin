<script>
  import { product } from "../../../store/stores";

  $: price = $product.price || "";
</script>

<div class="relative">
  <input
    on:change={(e) => product.update({ price: parseFloat(e.target.value) })}
    value={price}
    class="input-oval"
    type="number"
    pattern="^\d*(\.\d{(0, 2)})?$"
    name="price"
    min="0"
    step="any"
    required
  />
  <label class="label-oval" for="price">Precio</label>
</div>
