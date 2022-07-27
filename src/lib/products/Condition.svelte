<script>
  import { credentials } from "./../../store/stores.js";
  import { product } from "../../store/stores";

  $: condition = $product.condition
    ? $product.condition
    : $credentials.settings.condition;
</script>

<div class="relative">
  <select
    value={condition}
    on:change={(e) => product.update({ condition: e.target.value })}
    class="input-oval"
    name="condition"
    id="condition"
    required
  >
    <option value="new">Nuevo</option>
    <option value="used">Usado</option>
    <option value="refused">Reacondicionado</option>
  </select>
  <label class="label-oval" for="condition">Condición</label>
</div>
