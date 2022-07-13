<script>
  import { delUserMl, authMl } from "./../../services/api/userMl.js";
  import { credentials, notification } from "../../store/stores";
  import { onMount } from "svelte";

  let nickname = "";
  async function getUriMl() {
    if (nickname.trim().length === 0) {
      notification.show("Ingresa el usuario de Mercado Libre", "warning");
      return;
    }
    try {
      const uri = await authMl({ nickname });
      // window.open(uri, "_blank");
    } catch (error) {
      notification.show(error, "error");
    }
  }
  onMount(() => {
    nickname = $credentials.userMl ? $credentials.userMl.nickname : "";
  });
</script>

<div class="relative mt-8 inline-block">
  <input
    class="input-oval max-w-xs"
    name="nickname"
    type="text"
    bind:value={nickname}
  />
  <label class="label-oval" for="nickname">Nickname</label>
</div>
<button on:click={getUriMl} class="btn ripple inline-block ml-4"
  >Autorizar</button
>
<button on:click={delUserMl} class="btn ripple inline-block ml-4"
  >Desvincular</button
>
