<script>
  import { getUserMl } from "./../../services/api/userMl.js";
  import { authMl } from "./../../services/api/auth.js";
  import { notification } from "../../store/stores";

  let nickname = "";
  async function getUriMl() {
    if (nickname.trim().length === 0) {
      notification.show("Ingresa el usuario de Mercado Libre", "warning");
      return;
    }
    try {
      const uri = await authMl({ nickname });
      console.log("uri", uri);
      window.open(uri, "_blank");
    } catch (error) {
      console.log("ERROR!!!!!!!!!!!!!!", error);
      notification.show(error, "error");
      // console.log(error);
    }
  }
</script>

<div class="relative mt-8 inline-block">
  <input
    bind:value={nickname}
    class="input-oval max-w-xs"
    name="nickname"
    type="text"
  />
  <label class="label-oval" for="nickname">Nickname</label>
</div>
<button on:click={getUriMl} class="btn ripple inline-block ml-4"
  >Autorizar</button
>

<button on:click={getUserMl} class="btn ripple inline-block mt-10"
  >Confirmar</button
>
