<script>
  import { product } from "../../store/stores";

  $: quantity = $product.available_quantity || "";
</script>

<div class="relative">
  <input
    on:change={(e) => product.update({ available_quantity: e.target.value })}
    value={quantity}
    class="input-oval"
    type="number"
    name="quantity"
    min="0"
    step="1"
    required
  />
  <label class="label-oval" for="quantity">Cantidad</label>
</div>
