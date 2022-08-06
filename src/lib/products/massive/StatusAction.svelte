<script>
  export let setStatus;
</script>

<div class="mt-6">
  <select
    class="input-oval"
    name="status"
    id="status"
    on:change={(e) => setStatus(e.target.value)}
  >
    <option value="">Estado</option>
    <option value="active">Activo</option>
    <option value="paused">Pausado</option>
    <option value="closed">Finalizado</option>
  </select>
</div>
