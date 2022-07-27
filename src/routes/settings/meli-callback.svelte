<script>
  import Spinner from "./../../lib/Spinner.svelte";
  import { page } from "$app/stores";
  import {
    replaceCode,
    getApiMlUser,
    createUserMl,
  } from "./../../services/api/userMl.js";
  import { onMount } from "svelte";
  import { credentials, notification } from "../../store/stores";

  const code = $page.url.searchParams.get("code");
  const state = $page.url.searchParams.get("state");
  let mlUser = null;

  let isLoading = true;

  onMount(async () => {
    try {
      const dataCredentials = await replaceCode(code);
      const dataMlUser = await getApiMlUser(dataCredentials.user_id);

      mlUser = {
        user_id: $credentials.id,
        access_token: dataCredentials.access_token,
        expires_in: dataCredentials.expires_in,
        refresh_token: dataCredentials.refresh_token,
        scope: dataCredentials.scope,
        token_type: dataCredentials.token_type,
        ml_user_id: dataCredentials.user_id,
        address: dataMlUser.address,
        buyer_reputation: dataMlUser.buyer_reputation,
        company: dataMlUser.company,
        country_id: dataMlUser.country_id,
        email: dataMlUser.email,
        first_name: dataMlUser.first_name,
        gender: dataMlUser.gender,
        nickname: dataMlUser.nickname,
        identification: dataMlUser.identification,
        last_name: dataMlUser.last_name,
        logo: dataMlUser.logo,
        permalink: dataMlUser.permalink,
        phone: dataMlUser.phone,
        seller_reputation: dataMlUser.seller_reputation,
        site_id: dataMlUser.site_id,
      };

      const nickname = state.split("-")[0];

      if (nickname !== dataMlUser.nickname)
        throw "No coincide el nickname ingresado con la autorización de Mercado Libre";

      await createUserMl(mlUser);
      notification.show("Nickname vinculado", "success");
    } catch (error) {
      console.log("ERROR", error);
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

{#if isLoading}
  <Spinner />
{/if}
