<script>
  import { product } from "../../../store/stores";

  $: status = $product.prodMl.status ? $product.prodMl.status : "";
</script>

<div class="relative">
  <select
    value={status}
    on:change={(e) => product.update({ status_ml: e.target.value })}
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
