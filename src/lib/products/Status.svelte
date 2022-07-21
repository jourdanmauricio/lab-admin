<script>
  import { newProduct } from "../../store/stores";
</script>

<div class="relative">
  <select
    on:change={(e) => newProduct.updateProduct({ status: e.target.value })}
    class="input-oval"
    name="status"
    id="status"
    required
  >
    <option value="active">Activo</option>
    <option value="paused">Pausado</option>
  </select>
  <label class="label-oval" for="status">Estado</label>
</div>
