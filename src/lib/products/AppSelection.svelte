<script>
  export let application;
  export let setApplication;
</script>

<div class="form-check">
  <input
    class="cursor-pointer accent-teal-600 h-4 w-4 transition duration-200 mt-1 float-left mr-2"
    type="checkbox"
    value=""
    id="local"
    checked={application.local}
    on:change={setApplication}
  />
  <label class="form-check-label inline-block text-gray-800" for="checkLocal">
    Localmente
  </label>
</div>
<div class="form-check">
  <input
    class="cursor-pointer accent-teal-600 h-4 w-4 transition duration-200 mt-1 float-left mr-2"
    type="checkbox"
    value=""
    id="ml"
    checked={application.ml}
    on:change={setApplication}
  />
  <label class="form-check-label inline-block text-gray-800" for="checkMl">
    Mercado Libre
  </label>
</div>
<div class="form-check">
  <input
    class="cursor-pointer accent-teal-600 h-4 w-4 transition duration-200 mt-1 float-left mr-2"
    type="checkbox"
    value=""
    id="web"
    checked={application.web}
    on:change={setApplication}
  />
  <label class="form-check-label inline-block text-gray-800" for="checkWeb">
    Web
  </label>
</div>
