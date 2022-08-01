<script>
  import { slide } from "svelte/transition";

  import { credentials } from "./../../store/stores.js";
  import { product } from "../../store/stores";
  import axios from "axios";
  import { flip } from "svelte/animate";

  export let variation_id;

  $: currentVariation = $product.variations.find(
    (variation) => variation.id === variation_id
  );

  $: list = currentVariation.picture_ids.map((varPic) => {
    let found = $product.pictures.find((prodPic) => varPic === prodPic.id);
    if (found) return found;
  });

  $: listPicsProd = $product.pictures;

  let hovering = false;
  let fileinput;
  let files = [];
  let active = { button1: false, button2: false };

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
          listPicsProd = [...listPicsProd, value];
          addPicture(value);
          console.log("list", listPicsProd);
        }
      });
      product.update({ pictures: listPicsProd });
    });
  };

  const drop = (event, target, id = "") => {
    console.log("Drop", event, target, id);
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

    let variation = Object.assign({}, currentVariation);
    console.log("list", list);

    let newList = list.map((el) => el.id);

    variation.picture_ids = newList;

    variation.updated = true;
    let newData = $product.variations.map((el) => {
      return el.id === variation.id ? variation : el;
    });

    product.update({ variations: newData });
  };

  const dragstart = (event, i) => {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.dropEffect = "move";
    const start = i;
    event.dataTransfer.setData("text/plain", start);
  };

  function deletePicture(id) {
    let variation = Object.assign({}, currentVariation);

    let newList = list.filter((el) => el.id !== id);

    variation.picture_ids = newList.map((el) => el.id);

    variation.updated = true;

    let newData = $product.variations.map((el) => {
      return el.id === variation.id ? variation : el;
    });

    product.update({ variations: newData });
  }

  function addPicture(picture) {
    let variation = Object.assign({}, currentVariation);

    let newList = [...list, picture];
    variation.picture_ids = newList.map((el) => el.id);
    variation.updated = true;

    let newData = $product.variations.map((el) => {
      return el.id === variation.id ? variation : el;
    });

    product.update({ variations: newData });
  }
</script>

<h2 class="text-xl text-center">
  Atributos de variación - {currentVariation.id}
</h2>
<div class="py-4">
  <div class="w-full border-t border-gray-900" />
</div>

<section class="overflow-hidden text-gray-700 ">
  <div class="container mx-auto ">
    <div class="min-h-[150px] flex flex-wrap m-2 rounded bg-white shadow-2xl">
      {#each list as picture, index (picture.id)}
        <div
          class="flex flex-wrap w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 item"
          animate:flip
          draggable={true}
          on:dragstart={(event) => dragstart(event, index)}
          on:drop|preventDefault={(event) => drop(event, index)}
          ondragover="return false"
          on:dragenter={() => (hovering = index)}
          class:is-active={hovering === index}
          on:dragend={() => (hovering = null)}
        >
          <div class="flex justify-center items-start relative w-full p-4 m-2">
            <img
              alt="gallery"
              class="block object-cover object-center max-w-[100px] lg:max-w-[150px] w-full h-full border border-solid border-secondaryColor rounded cursor-move"
              src={picture.secure_url}
            />
            <button on:click={(e) => deletePicture(picture.id)} class="">
              <i class="material-icons text-red-500 btn-rounded">delete</i>
            </button>
          </div>
        </div>
      {/each}
      <div class="max-h-[50px] self-end flex w-full p-1">
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
    <button
      class:active={active.button1}
      on:click={() => (active.button1 = !active.button1)}
      class=" mt-4 flex justify-between text-gray-700 cursor-pointer p-2 w-full text-left border-none outline-none rounded hover:bg-gray-400 {active.button1
        ? 'bg-gray-400'
        : 'bg-gray-100'}"
    >
      <span>Imágenes en producto</span>
      <i class="material-icons"
        >{active.button1 ? "expand_less" : "expand_more"}</i
      >
    </button>
    {#if active.button1}
      <div
        transition:slide|local
        class="flex flex-wrap m-2 rounded shadow-2xl py-0 px-4 bg-white"
      >
        {#each $product.pictures as picture, index (picture.id)}
          <div
            class="flex flex-wrap w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 item"
            id={picture.id}
          >
            <div
              class="flex justify-center items-start relative w-full p-4 m-2"
            >
              <img
                ondragstart="return false;"
                ondrop="return false;"
                alt="gallery"
                class="{!!list.find((el) => el.id === picture.id)
                  ? 'opacity-25'
                  : ''}  block object-cover object-center max-w-[100px] sm:max-w-[150px] w-full h-full border border-solid border-secondaryColor rounded "
                src={picture.secure_url}
              />
              <button
                on:click={(e) => addPicture(picture)}
                class="{!!list.find((el) => el.id === picture.id)
                  ? 'hidden'
                  : ''} absolute -top-2 -right-2"
              >
                <i class="text-teal-500 btn-rounded material-icons">add</i>
              </button>
            </div>
          </div>
        {/each}
      </div>
    {/if}

    <button
      class:active={active.button2}
      on:click={() => (active.button2 = !active.button2)}
      class="flex justify-between text-gray-700 cursor-pointer p-2 w-full text-left border-none outline-none rounded hover:bg-gray-400 {active.button2
        ? 'bg-gray-400'
        : 'bg-gray-100'}"
    >
      <span>Imágenes predefinidas</span>
      <i class="material-icons"
        >{active.button2 ? "expand_less" : "expand_more"}</i
      >
    </button>
    {#if active.button2}
      <div transition:slide|local class="py-0 px-4 bg-white overflow-hidden">
        <p>Lorem ipsum...</p>
      </div>
    {/if}
  </div>
</section>

{#each Object.entries(currentVariation.picture_ids) as [key, value]}
  <p>{key} - {JSON.stringify(value)}</p>
{/each}

<style>
  .item:not(:last-child) {
    border-bottom: 1px solid #dbdbdb;
  }

  .item.is-active {
    color: #fff;
    opacity: 0.4;
  }
  /* .upload {
    display: flex;
    height: 50px;
    width: 50px;
    cursor: pointer;
  } */
</style>
