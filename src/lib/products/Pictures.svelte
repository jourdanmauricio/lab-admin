<script>
  import axios from "axios";

  import { flip } from "svelte/animate";
  import { credentials, product } from "./../../store/stores.js";

  let list = $product.pictures;
  let hovering = false;
  let fileinput;
  let files = [];

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
</script>

<section class="overflow-hidden text-gray-700 ">
  <div class="container mx-auto ">
    <!-- lg:pt-12 lg:px-32 -->
    <div class="flex flex-wrap m-2 rounded bg-white shadow-2xl">
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
          <div class="flex items-center w-full md:p-3">
            <img
              alt="gallery"
              class="block object-cover object-center max-w-[180px] w-full  border border-solid border-secondaryColor rounded cursor-move"
              src={picture.secure_url}
            />
          </div>
        </div>
      {/each}
      <div class="flex w-full p-1">
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
  </div>
</section>

{$product.thumbnail}
{#each Object.entries($product.pictures) as [key, value]}
  <p>{key} - {JSON.stringify(value)}</p>
{/each}

<style>
  .item {
    padding: 0.5em 1em;
  }

  .item:not(:last-child) {
    border-bottom: 1px solid #dbdbdb;
  }

  .item.is-active {
    color: #fff;
    opacity: 0.4;
  }
  .upload {
    display: flex;
    height: 50px;
    width: 50px;
    cursor: pointer;
  }
</style>
