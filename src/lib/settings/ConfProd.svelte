<script>
  import { putSetting } from "./../../services/api/settings.js";
  import { onMount } from "svelte";
  import { credentials, notification } from "../../store/stores.js";

  let settings;

  async function handleChange() {
    try {
      const userSettings = await putSetting(settings);
      let user = $credentials;
      user.settings = userSettings.setting;
      localStorage.setItem("user", JSON.stringify(user));
      credentials.setCredentials(user);
      notification.show("Condifguración modificada", "success");
      console.log("user", user);
    } catch (error) {
      console.log("ERROR", error);
    }
  }

  onMount(async () => {
    settings = $credentials.settings;
    console.log("$credentials", $credentials);
  });
</script>

{#if settings}
  <div class="h-screen">
    <div class="py-4">
      <span>Productos</span>
      <div class="w-full border-t border-gray-900" />
    </div>
    <div class="grid grid-cols-2 gap-8 mt-8">
      <div class="relative">
        <select
          bind:value={settings.status}
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

      <div class="relative">
        <select
          bind:value={settings.listingType}
          class="input-oval"
          name="listingType"
          id="listingType"
          required
        >
          <option value="gold_special">Clásica</option>
          <option value="gold_pro">Premium</option>
        </select>
        <label class="label-oval" for="listingType">Tipo de publicación</label>
      </div>

      <div class="relative">
        <select
          bind:value={settings.condition}
          class="input-oval"
          name="condition"
          id="condition"
          required
        >
          <option value="new">Nuevo</option>
          <option value="used">Usado</option>
          <option value="refused">Reacondicionado</option>
        </select>
        <label class="label-oval" for="condition">Condición del item</label>
      </div>
    </div>
    <div class="my-2 py-4">
      <span>Sincronización</span>
      <div class="w-full border-t border-gray-900" />
    </div>

    <!-- precio ML - WEB -->
    <div class="mt-8 grid grid-cols-2 gap-8">
      <div class="relative">
        <input
          class="input-oval"
          type="number"
          id="price_percent_ml"
          bind:value={settings.price_percent_ml}
          required
        />
        <label class="label-oval" for="price_percent_ml">% precio ML</label>
      </div>
      <div class="relative">
        <input
          class="input-oval"
          type="number"
          id="price_percent_ml"
          bind:value={settings.price_percent_web}
          required
        />
        <label class="label-oval" for="price_percent_ml">% precio Web</label>
      </div>
    </div>
    <div class="mt-12 flex justify-end items-end">
      <button on:click={handleChange} class="btn ripple">Modificar</button>
    </div>
  </div>
{/if}
