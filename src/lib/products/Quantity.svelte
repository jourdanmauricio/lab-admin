<script>
  import { newProduct } from "../../store/stores";
</script>

<div class="relative">
  <input
    on:blur={(e) =>
      newProduct.updateProduct({ available_quantity: e.target.value })}
    class="input-oval"
    type="number"
    name="quantity"
    min="0"
    step="1"
    required
  />
  <label class="label-oval" for="quantity">Cantidad</label>
</div>
