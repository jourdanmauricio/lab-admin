<script>
  import { product } from "../../store/stores";

  $: seller_custom_field = $product.seller_custom_field || "";
</script>

<div class="relative col-span-3">
  <input
    on:blur={(e) => product.update({ seller_custom_field: e.target.value })}
    value={seller_custom_field}
    class="input-oval"
    type="text"
    name="sku"
    required
  />
  <label class="label-oval" for="sku">Sku</label>
</div>
<button class="col-span-1">Q</button>
