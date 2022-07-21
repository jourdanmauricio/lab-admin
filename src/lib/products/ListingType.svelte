<script>
  import { newProduct } from "../../store/stores";
</script>

<div class="relative">
  <select
    on:change={(e) =>
      newProduct.updateProduct({ listing_type_id: e.target.value })}
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
