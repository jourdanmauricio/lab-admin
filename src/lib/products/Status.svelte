<script>
  import { credentials, product } from "../../store/stores";

  $: status = $product.status ? $product.status : $credentials.settings.status;
</script>

<div class="relative">
  <select
    value={status}
    on:change={(e) => product.update({ status: e.target.value })}
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
