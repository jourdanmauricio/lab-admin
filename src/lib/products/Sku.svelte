<script>
  import { newProduct } from "../../store/stores";
</script>

<div class="relative col-span-3">
  <input
    on:blur={(e) => newProduct.updateProduct({ sku: e.target.value })}
    class="input-oval"
    type="text"
    name="sku"
    required
  />
  <label class="label-oval" for="sku">Sku</label>
</div>
<button class="col-span-1">Q</button>
