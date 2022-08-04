<script>
  export let pictures;
  export let list = [];
  export let addPicture;
</script>

<div class="opt-container flex items-center w-full h-40 overflow-x-auto">
  <div class="flex gap-8 top-0 left-0">
    {#each pictures as picture}
      <div
        class="relative flex items-center justify-center h-24 w-24 rounded border boder-solid border-gray-700"
      >
        <img
          class="object-scale-down rounded h-full"
          src={picture.secure_url}
          alt=""
        />
        <div
          class="absolute 
        {!!list.find((el) => el.id === picture.id)
            ? 'inset-0 bg-gray-900 bg-opacity-75'
            : ''}"
        />
        <button
          on:click={addPicture(picture)}
          class="{!!list.find((el) => el.id === picture.id)
            ? 'hidden'
            : ''} absolute hover:cursor-pointer z-10 right-0 top-0"
          ><i class="material-icons text-teal-600">add</i></button
        >
      </div>
    {/each}
  </div>
</div>

<style>
  .opt-container::-webkit-scrollbar {
    height: 8px;
    background: #fff;
    border-radius: 0 0 8px 8px;
  }
  .opt-container::-webkit-scrollbar-thumb {
    background: #777;
    border-radius: 0 0 2px 2px;
  }
</style>
