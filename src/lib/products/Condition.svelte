<script>
  import { newProduct } from "../../store/stores";
</script>

<div class="relative">
  <select
    on:change={(e) => newProduct.updateProduct({ status: e.target.value })}
    class="input-oval"
    name="condition"
    id="condition"
    required
  >
    <option value="2230284">Nuevo</option>
    <option value="2230581">Usado</option>
    <option value="2230582">Reacondicionado</option>
  </select>
  <label class="label-oval" for="condition">Condición</label>
</div>
