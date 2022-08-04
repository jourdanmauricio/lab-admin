<script>
  import axios from "axios";
  import { slide } from "svelte/transition";

  import { flip } from "svelte/animate";
  import { credentials, product } from "./../../store/stores.js";
  import PictureCarrousel from "./PictureCarrousel.svelte";

  let list = $product.pictures;
  let hovering = false;
  let fileinput;
  let files = [];
  let active = { button1: false };

  const onFileSelected = async (e) => {
    files = Array.from(e.target.files);
    console.log("click", files);

    // ******************************************** //
    let requests = Array.from(e.target.files).map((file) => {
      let formData = new FormData();
      formData.append("file", file);

      // You should have a server side REST API

      return axios
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
            url: res.data.variations[0].url,
            size: res.data.variations[0].size,
            quality: "",
            max_size: res.data.max_size,
            secure_url: res.data.variations[0].secure_url,
          };
          return pic;
        })
        .catch((err) => {
          console.log("ERRRRRRRRRRRRRRRR", err);
          return "Error";
        });
    });
    await Promise.all(requests).then((values) => {
      values.forEach((value) => {
        if (value != "Error") {
          list = [...list, value];
          console.log("list", list);
        }
      });
      product.update({ pictures: list });
    });
  };

  const drop = (event, target) => {
    event.dataTransfer.dropEffect = "move";
    const start = parseInt(event.dataTransfer.getData("text/plain"));
    const newTracklist = list;

    if (start < target) {
      newTracklist.splice(target + 1, 0, newTracklist[start]);
      newTracklist.splice(start, 1);
    } else {
      newTracklist.splice(target, 0, newTracklist[start]);
      newTracklist.splice(start + 1, 1);
    }
    list = newTracklist;
    hovering = null;
    product.update({ pictures: list });
  };

  const dragstart = (event, i) => {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.dropEffect = "move";
    const start = i;
    event.dataTransfer.setData("text/plain", start);
  };

  function addPicturePreconf(picture) {
    list = [...list, picture];
    product.update({ pictures: list });
  }

  function deletePicture(id) {
    list = list.filter((pic) => pic.id !== id);
    product.update({ pictures: list });
  }
</script>

<section class="mt-4 overflow-hidden text-gray-700 ">
  <div class="container mx-auto ">
    <div
      class="flex flex-wrap rounded bg-white border border-solid border-gray-500 shadow"
    >
      {#each list as picture, index (picture.id)}
        <div
          animate:flip
          class="flex items-center justify-center flex-wrap  p-4 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 item"
          draggable={true}
          on:dragstart={(event) => dragstart(event, index)}
          on:drop|preventDefault={(event) => drop(event, index)}
          ondragover="return false"
          on:dragenter={() => (hovering = index)}
          class:is-active={hovering === index}
          on:dragend={() => (hovering = null)}
        >
          <div
            class="relative flex items-center justify-center h-24 w-24 rounded border boder-solid border-gray-700"
          >
            <img
              alt="gallery"
              class="object-scale-down rounded h-full"
              src={picture.secure_url}
            />
            <button on:click={(e) => deletePicture(picture.id)} class="">
              <i
                class="material-icons text-red-500 absolute hover:cursor-pointer z-10 right-0 top-0"
                >delete</i
              >
            </button>
          </div>
        </div>
      {/each}
      <div class="flex w-full p-1 text-gray-900">
        <button
          on:click={() => {
            fileinput.click();
          }}
          class="flex justify-center items-center w-full border border-solid border-secondaryColor rounded"
        >
          <span class="text-lg">Seleccionar</span>
          <i class="ml-2 material-icons leading-normal">file_upload</i>
        </button>
        <input
          class="hidden"
          type="file"
          accept=".jpg, .jpeg, .png"
          on:change={(e) => onFileSelected(e)}
          bind:this={fileinput}
          multiple
        />
      </div>
    </div>
    <!-- boton 1 -->
    <button
      class:active={active.button1}
      on:click={() => (active.button1 = !active.button1)}
      class="mt-4 flex justify-between text-gray-900 cursor-pointer p-2 w-full text-left border-none outline-none rounded hover:bg-gray-400 {active.button1
        ? 'bg-gray-400'
        : 'bg-gray-100'}"
    >
      <span>Imágenes predefinidas</span>
      <i class="material-icons"
        >{active.button1 ? "expand_less" : "expand_more"}</i
      >
    </button>
    {#if active.button1}
      <div
        transition:slide|local
        class="flex flex-wrap mb-2 rounded shadow shadow-black py-0 px-4 bg-white"
      >
        <PictureCarrousel
          pictures={$credentials.settings.pictures}
          {list}
          addPicture={addPicturePreconf}
        />
      </div>
    {/if}
  </div>
</section>

{#each Object.entries($product.pictures) as [key, value]}
  <p>{key} - {JSON.stringify(value)}</p>
{/each}

<style>
  .item {
    border-bottom: 1px solid #999;
  }

  .item.is-active {
    color: #fff;
    opacity: 0.4;
  }
</style>
