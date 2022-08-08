<script>
  import axios from "axios";
  import { putSetting } from "./../../services/api/settings.js";
  import { onMount } from "svelte";
  import { credentials, notification } from "../../store/stores.js";

  let settings;
  let fileinput;
  let name = "";

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

  function deletePicture(id) {
    settings.pictures = settings.pictures.filter((pic) => pic.id !== id);
  }
  const onFileSelected = async (e) => {
    let index = settings.pictures.findIndex((pic) => pic.name === name);
    if (index !== -1) {
      notification.show("El nombre ya existe", "error");
      return;
    }
    let file = e.target.files[0];
    // ******************************************** //
    let formData = new FormData();
    formData.append("file", file);

    axios
      .post("https://api.mercadolibre.com/pictures", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${$credentials.userMl.access_token}`,
        },
      })
      .then(async (res) => {
        console.log("RES", res);
        let pic = {
          id: res.data.id,
          name: name,
          url: res.data.variations[0].url,
          size: res.data.variations[0].size,
          quality: "",
          max_size: res.data.max_size,
          secure_url: res.data.variations[0].secure_url,
        };
        settings.pictures = [...settings.pictures, pic];
        console.log("settings.pictures", settings.pictures);
      })
      .catch((err) => {
        console.log("ERRRRRRRRRRRRRRRR", err);
        return "Error";
      });
  };

  onMount(async () => {
    settings = $credentials.settings;
    if (!settings.pictures) settings.pictures = [];
    console.log("$credentials", $credentials);
  });
</script>

{#if settings}
  <div class="h-screen">
    <!-- Productos -->
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
          bind:value={settings.listing_type_id}
          class="input-oval"
          name="listing_type_id"
          id="listing_type_id"
          required
        >
          <option value="gold_special">Clásica</option>
          <option value="gold_pro">Premium</option>
        </select>
        <label class="label-oval" for="listing_type_id"
          >Tipo de publicación</label
        >
      </div>
    </div>
    <div class="grid grid-cols-2 gap-8 mt-8">
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
      <div>
        <div class="form-check">
          <input
            class="cursor-pointer accent-teal-600 h-4 w-4 transition duration-200 mt-1 float-left mr-2"
            type="checkbox"
            value=""
            id="local"
            bind:checked={settings.hintSku}
          />
          <label
            class="form-check-label inline-block text-gray-800"
            for="checkLocal"
          >
            Sugerir Sku
          </label>
        </div>
      </div>
    </div>

    <!-- Sincronización -->
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
    <!-- Imagenes -->
    <div class="my-2 py-4">
      <span>Imágenes</span>
      <div class="w-full border-t border-gray-900" />
    </div>
    <div class="mt-2">
      <caption class="bg-gray-700 flex justify-between w-full py-1 px-3">
        <input
          class="border border-solid border-gray-900 h-8 rounded"
          placeholder="Nombre"
          type="text"
          name="name"
          bind:value={name}
        />
        <button
          disabled={name.length === 0}
          on:click={() => {
            fileinput.click();
          }}
          class="h-8 flex justify-center items-center border border-solid border-secondaryColor rounded"
        >
          <span class="text-lg px-4">Seleccionar</span>
          <i class="ml-2 material-icons leading-normal">file_upload</i>
        </button>
        <input
          class="hidden"
          type="file"
          accept=".jpg, .jpeg, .png"
          on:change={(e) => onFileSelected(e)}
          bind:this={fileinput}
        />
      </caption>
      <table class="responsive-table">
        <thead>
          <th>Id</th>
          <th>Nombre</th>
          <th>Imagen</th>
          <th>Acciones</th>
        </thead>
        <tbody>
          {#each settings.pictures as picture (picture.id)}
            <tr>
              <td>{picture.id}</td>
              <td>{picture.name}</td>
              <td
                ><img
                  class="mx-auto block object-cover object-center w-20 h-20"
                  src={picture.secure_url}
                  alt=""
                /></td
              >
              <td
                ><button on:click={deletePicture(picture.id)} id={picture.id}
                  ><i class="material-icons text-red-500">delete</i></button
                ></td
              >
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <div class="mt-12 flex justify-end items-end">
      <button on:click={handleChange} class="btn ripple">Modificar</button>
    </div>
  </div>
{/if}
