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

  async function setMlUser() {
    try {
      console.log("mlUser", mlUser);

      const nickname = state.split("-")[0];

      const rta = await createUserMl(mlUser);
      console.log("rta", rta);
    } catch (error) {
      console.log("ERROR!!!!!!!!!!!!!", error);
    }
  }

  onMount(async () => {
    try {
      const dataCredentials = await replaceCode(code);
      console.log("dataCredentials", dataCredentials);
      const dataMlUser = await getApiMlUser(dataCredentials.user_id);
      console.log("dataMlUser", dataMlUser);

      mlUser = {
        userId: $credentials.id,
        accessToken: dataCredentials.access_token,
        expiresIn: dataCredentials.expires_in,
        refreshToken: dataCredentials.refresh_token,
        scope: dataCredentials.scope,
        tokenType: dataCredentials.token_type,
        mlUserId: dataCredentials.user_id,
        address: dataMlUser.address,
        buyerReputation: dataMlUser.buyer_reputation,
        company: dataMlUser.company,
        countryId: dataMlUser.country_id,
        email: dataMlUser.email,
        firstName: dataMlUser.first_name,
        gender: dataMlUser.gender,
        nickname: dataMlUser.nickname,
        identification: dataMlUser.identification,
        lastName: dataMlUser.last_name,
        logo: dataMlUser.logo,
        permalink: dataMlUser.permalink,
        phone: dataMlUser.phone,
        sellerReputation: dataMlUser.seller_reputation,
        siteId: dataMlUser.site_id,
      };

      if (nickname !== dataMlUser.nickname)
        throw "No coincide el nickname ingresado con la autorización de Mercado Libre";

      console.log("mlUser", mlUser);
    } catch (error) {
      console.log("error!!!!!!", error);
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

<button on:click={setMlUser}>Confirmar</button>

{#if isLoading}
  <Spinner />
{/if}
