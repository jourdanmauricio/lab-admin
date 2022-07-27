<script>
  import { credentials } from "./../../store/stores.js";
  import { product } from "../../store/stores";

  $: listing_type_id = $product.listing_type_id
    ? $product.listing_type_id
    : $credentials.settings.listing_type_id;
</script>

<div class="relative">
  <select
    value={listing_type_id}
    on:change={(e) => product.update({ listing_type_id: e.target.value })}
    class="input-oval"
    name="listtingType"
    id="listtingType"
    required
  >
    <option value="gold_special">Clásica</option>
    <option value="gold_pro">Premium</option>
    <option value="free">Gratuita</option>
  </select>
  <label class="label-oval" for="listtingType">Tipo de publicación</label>
</div>
