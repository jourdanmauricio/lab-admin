<script>
  import { newProduct } from "../../store/stores";
</script>

<div class="relative">
  <textarea
    class="mt-8 input-oval"
    on:blur={(e) => newProduct.updateProduct({ description: e.target.value })}
    name="description"
    id="description"
    rows="10"
  />
  <label class="label-oval" for="description">Descripción</label>
</div>
