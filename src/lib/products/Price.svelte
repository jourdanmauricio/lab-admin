<script>
  import { newProduct } from "../../store/stores";
</script>

<div class="relative">
  <input
    on:blur={(e) => newProduct.updateProduct({ price: e.target.value })}
    class="input-oval"
    type="number"
    pattern="^\d*(\.\d{(0, 2)})?$"
    name="price"
    min="0"
    step="1"
    required
  />
  <label class="label-oval" for="price">Precio</label>
</div>
