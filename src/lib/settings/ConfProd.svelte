<script>
</script>

<div class="h-screen">
  <div class="grid grid-cols-2 gap-8 mt-8">
    <div class="relative">
      <select class="input-oval" name="status" id="status" required>
        <option value="active">Activo</option>
        <option value="paused">Pausado</option>
      </select>
      <label class="label-oval" for="status">Estado</label>
    </div>

    <div class="relative">
      <select class="input-oval" name="listingType" id="listingType" required>
        <option value="gold_special">Clásica</option>
        <option value="gold_pro">Premium</option>
      </select>
      <label class="label-oval" for="listingType">Tipo de publicación</label>
    </div>

    <div class="relative">
      <select class="input-oval" name="condition" id="condition" required>
        <option value="2230284">Nuevo</option>
        <option value="2230581">Usado</option>
        <option value="2230582">Reacondicionado</option>
      </select>
      <label class="label-oval" for="condition">Condición del item</label>
    </div>
  </div>
  <div class="mt-12 flex justify-end items-end">
    <button class="btn ripple">Modificar</button>
  </div>
</div>
