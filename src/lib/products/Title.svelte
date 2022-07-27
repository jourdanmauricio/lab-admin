<script>
  import { product } from "../../store/stores";

  $: title = $product.title || "";
</script>

<div class="relative col-span-8">
  <input
    on:blur={(e) => product.update({ title: e.target.value })}
    value={title}
    class="input-oval"
    type="text"
    name="name"
    max="60"
    required
  />
  <label class="label-oval" for="name">Nombre</label>
</div>
