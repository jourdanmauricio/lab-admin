<script>
  import { product } from "../../store/stores";

  $: description = $product.description ? $product.description : "";
</script>

<div class="relative">
  <textarea
    value={description}
    class="mt-8 input-oval"
    on:change={(e) => product.update({ description: e.target.value })}
    name="description"
    id="description"
    rows="10"
  />
  <label class="label-oval" for="description">Descripción</label>
</div>
