<script>
  import { newProduct } from "../../store/stores";
</script>

<div class="relative col-span-8">
  <input
    on:blur={(e) => newProduct.updateProduct({ title: e.target.value })}
    class="input-oval"
    type="text"
    name="name"
    max="60"
    required
  />
  <label class="label-oval" for="name">Nombre</label>
</div>
