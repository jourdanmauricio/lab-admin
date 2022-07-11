<script>
  import Snackbar from "./../lib/Snackbar.svelte";
  import Footer from "./../lib/Footer.svelte";
  import NavHome from "$lib/Nav-home.svelte";
  import { isLogged, credentials, notification } from "../store/stores.js";
  import { goto } from "$app/navigation";
  import { variables } from "$lib/variables";
  import { validateFields } from "../helpers/validateFileds";
  import Spinner from "../lib/Spinner.svelte";

  let errors = {};
  let email = "admin@integriprod.com";
  let password = "integriprod";
  let isLoading = false;

  function resetFieldError(e) {
    delete errors[e.target.name];
    errors = errors;
  }

  async function submitHandler(event) {
    const formData = new FormData(event.target);
    const formUser = {};
    for (const [key, value] of formData.entries()) {
      formUser[key] = value;
    }
    /* isPassword, isConfirmPassword, isEmail, isName, isPhone, isDocument, none */
    formData.append("email", "isEmail");
    formData.append("password", "isPassword");
    errors = validateFields(formData);

    if (Object.keys(errors).length === 0) {
      isLoading = true;
      try {
        const res = await fetch(`${variables.basePath}/auth/login`, {
          method: "POST",
          body: JSON.stringify(formUser),
          headers: {
            "content-type": "application/json",
          },
        });
        const data = await res.json();
        if (res.status === 200) {
          isLogged.login();
          data.user.token = data.token;
          localStorage.setItem("user", JSON.stringify(data.user));
          credentials.setCredentials(data.user);
          console.log("user:", data.user);
          notification.show("Bienvenido!!!", "info");
          goto("/dashboard");
        } else {
          throw "Error en Login";
        }
      } catch (err) {
        notification.show(err, "error");
      } finally {
        isLoading = false;
      }
    }
  }
</script>

<NavHome />
<Snackbar />

<div class="h-screen" id="inicio">
  <h2>Inicio</h2>
</div>

<div class="h-screen" id="login">
  <div
    class="ml-auto mr-auto text-center w-2/4 min-w-280 max-w-550 p-10 bg-gray-900 box-border	shadow-3xl rounded-lg"
  >
    <h2 class="text-center text-3xl p-0 text-white">Login</h2>

    <form on:submit|preventDefault={submitHandler}>
      <div class="relative mt-16">
        <input
          class="input-oval text-white valid:border-white focus:border-white invalid:border-white"
          type="text"
          name="email"
          bind:value={email}
          on:input={resetFieldError}
          required="required"
        />
        <label class="label-oval text-white" for="email">Email</label>
        {#if errors.email}
          <p class="error">
            <small style="color: red"> {errors.email} </small>
          </p>
        {/if}
      </div>
      <div class="relative mt-16">
        <input
          class="input-oval text-white valid:border-white focus:border-white invalid:border-white"
          type="password"
          name="password"
          bind:value={password}
          on:input={resetFieldError}
          required="required"
        />
        <label class="label-oval text-white" for="password">Password</label>
        {#if errors.password}
          <p class="error">
            <small style="color: red"> {errors.password} </small>
          </p>
        {/if}
      </div>

      <p class="text-right text-white cursor-pointer mt-8">
        <a class="" href="/forgot-password"> ¿Olvidó su contraseña?</a>
      </p>

      <button type="submit" class="mt-10 btn ripple">Login</button>
    </form>
  </div>
</div>
<div class="h-screen" id="contacto">
  <h2>Contacto</h2>
</div>
{#if isLoading}
  <Spinner />
{/if}

<Footer />

<style>
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus {
    -webkit-text-fill-color: white;
    transition: background-color 5000s ease-in-out 0s;
    caret-color: white;
  }
</style>
