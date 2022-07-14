<script>
  import Spinner from "./../../lib/Spinner.svelte";
  import { page } from "$app/stores";
  import { replaceCode } from "./../../services/api/userMl.js";
  import { onMount } from "svelte";
  import { notification } from "../../store/stores";

  const code = $page.url.searchParams.get("code");
  const state = $page.url.searchParams.get("state");
  let data = null;

  let isLoading = true;

  onMount(async () => {
    try {
      console.log("code", code);
      const dataCredentials = await replaceCode(code);
      console.log("dataCredentials", dataCredentials);
      const dataMlUser = await getApiMlUser(dataCredentials.mlUserId);

      console.log("dataMlUser", dataMlUser);

      // const credentialsMl = {
      //   accessToken: res.access_token,
      //   expiresIn: res.expires_in,
      //   refreshToken: res.refresh_token,
      //   scope: res.scope,
      //   tokenType: res.token_type,
      //   mlUserId: res.user_id,
      //   // nickname,
      // };
      //
      // const user = get(credentials);
      // const upd = await Api.patch(`authML/${user.id}`);

      // const rta = await service.update(state, resMl);
    } catch (error) {
      notification.show(error, "error");
    } finally {
      isLoading = false;
    }
  });
</script>

<h1>Estamos sincronizando con Mercado Libre....</h1>
<br /><br />
<p>{code}</p>
<p>{state}</p>

{data}

{#if isLoading}
  <Spinner />
{/if}
