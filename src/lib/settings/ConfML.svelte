<script>
  import { variables } from "$lib/variables";
  import { delUserMl } from "./../../services/api/userMl.js";
  import { credentials, notification } from "../../store/stores";
  import { onMount } from "svelte";

  let nickname = "";
  const userMl = $credentials.userMl;
  async function getUriMl() {
    if (nickname.trim().length === 0) {
      notification.show("Ingresa el usuario de Mercado Libre", "warning");
      return;
    }
    try {
      const state = nickname + "-" + Math.floor(Math.random() * 1000000);
      const uri = `https://auth.mercadolibre.com.ar/authorization?response_type=code&client_id=${variables.mlAppId}&redirect_uri=${variables.frontend}/settings/meli-callback&state=${state}`;
      // window.open(uri, "_blank");
      window.open(uri);
    } catch (error) {
      notification.show(error, "error");
    }
  }

  async function deleteUserMl() {
    try {
      await delUserMl();
      nickname = "";
      notification.show("Nickname desviculado", "success");
    } catch (error) {
      notification.show(error, "error");
    }
  }
  onMount(() => {
    nickname = $credentials.userMl ? $credentials.userMl.nickname : "";
  });
</script>

<div>
  <div class="flex flex-wrap justify-between">
    <div class="mt-5 relative">
      <input
        disabled={$credentials.userMl}
        class="input-oval max-w-xs "
        name="nickname"
        type="text"
        required
        bind:value={nickname}
      />
      <label class="label-oval" for="nickname">Nickname</label>
    </div>

    <div>
      <button
        disabled={$credentials.userMl}
        on:click={getUriMl}
        class="mt-4 btn ml-4 disabled:bg-gray-500 {!$credentials.userMl
          ? 'ripple'
          : ''}">Autorizar</button
      >
      <button
        disabled={!$credentials.userMl}
        on:click={deleteUserMl}
        class="mt-4 btn ml-4 disabled:bg-gray-500 {$credentials.userMl
          ? 'ripple'
          : ''}">Desvincular</button
      >
    </div>
  </div>
</div>
<!-- <div
  class="mt-4 p-4 w-full  text-center bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-300 dark:border-gray-800 {userMl
    ? 'hidden'
    : ''}"
>
  <p>
    {userMl.firstName}
    {userMl.lastName} - {userMl.identification.type}
    {userMl.identification.number} - ML ID {userMl.mlUserId}
  </p>
  <hr class="border-gray-700" />

  <p class="mt-4 text-left text-gray-600">
    {userMl.email}
  </p>
  <p class="text-left text-gray-600">
    {userMl.phone.area_code}
    {userMl.phone.extension}
    {userMl.phone.number}
  </p>
  <p class="text-left text-gray-600">
    {userMl.address.address}
    {userMl.address.city}
    {userMl.address.state}
    {userMl.address.zip_code}
  </p>
</div> -->
