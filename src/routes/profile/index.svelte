<script>
  import {
    createCustomer,
    updateCustomer,
  } from "./../../services/api/profile.js";
  import { credentials, notification } from "./../../store/stores";
  import ModalChangePass from "./../../lib/profile/Modal-change-Pass.svelte";
  import { validateFields } from "./../../helpers/validateFileds";
  import Spinner from "./../../lib/Spinner.svelte";

  let errors = {};
  let isLoading = false;

  function resetFieldError(e) {
    delete errors[e.target.name];
    errors = errors;
  }

  async function handleSubmit(event) {
    const formData = new FormData(event.target);
    const formUser = {};
    for (const [key, value] of formData.entries()) {
      formUser[key] = value;
    }
    /* isPassword, isConfirmPassword, isEmail, isName, isPhone, isDocument, none */
    formData.append("name", "isName");
    formData.append("last_name", "isName");
    formData.append("document_type", "isName");
    formData.append("phone", "isPhone");
    formData.append("document_number", "isDocument");
    errors = validateFields(formData);

    if (Object.keys(errors).length === 0) {
      isLoading = true;
      formUser.user_id = $credentials.id;
      delete formUser.role;
      let res;
      try {
        if ($credentials.customer) {
          res = await updateCustomer(formUser);
        } else {
          res = await createCustomer(formUser);
        }
        notification.show("Perfil actualizado correctamente 👌", "success");
      } catch (err) {
        notification.show(err, "error");
      } finally {
        isLoading = false;
      }
    }
  }
</script>

<div class="flex flex-wrap justify-between gap-y-2">
  <h2 class="text-lg">{$credentials.email}</h2>
  <button class="btn ripple btn-local">Eliminar cuenta</button>
  <ModalChangePass />
</div>

<form class="mt-10" on:submit|preventDefault={handleSubmit}>
  <div class="grid grid-cols-2 gap-10">
    <div class="relative">
      <input
        class="input-oval"
        type="text"
        name="name"
        on:input={resetFieldError}
        value={$credentials.customer ? $credentials.customer.name : ""}
        required="required"
      />
      <label class="label-oval" for="password">Nombre</label>
      {#if errors.name}
        <p class="error">
          <small style="color: red"> {errors.name} </small>
        </p>
      {/if}
    </div>
    <div class="relative">
      <input
        class="input-oval"
        type="text"
        name="last_name"
        on:input={resetFieldError}
        value={$credentials.customer ? $credentials.customer.last_name : ""}
        required="required"
      />
      <label class="label-oval" for="password">Apellido</label>
      {#if errors.last_name}
        <p class="error">
          <small style="color: red"> {errors.last_name} </small>
        </p>
      {/if}
    </div>
    <div class="relative">
      <input
        class="input-oval"
        type="text"
        name="role"
        on:input={resetFieldError}
        value={$credentials.role}
        readonly
      />
      <label class="label-oval" for="role">Role</label>
    </div>
    <div class="relative">
      <input
        class="input-oval"
        type="text"
        name="phone"
        on:input={resetFieldError}
        value={$credentials.customer ? $credentials.customer.phone : ""}
        required="required"
      />
      <label class="label-oval" for="phone">Teléfono</label>
      {#if errors.phone}
        <p class="error">
          <small style="color: red"> {errors.phone} </small>
        </p>
      {/if}
    </div>
    <div class="relative">
      <input
        class="input-oval"
        type="text"
        name="document_type"
        on:input={resetFieldError}
        value={$credentials.customer ? $credentials.customer.document_type : ""}
        required="required"
      />
      <label class="label-oval" for="document_type">Tipo documento</label>
      {#if errors.document_type}
        <p class="error">
          <small style="color: red"> {errors.document_type} </small>
        </p>
      {/if}
    </div>
    <div class="relative">
      <input
        class="input-oval"
        type="text"
        name="document_number"
        on:input={resetFieldError}
        value={$credentials.customer
          ? $credentials.customer.document_number
          : ""}
        required="required"
      />
      <label class="label-oval" for="document_number">Número documento</label>
      {#if errors.document_number}
        <p class="error">
          <small style="color: red"> {errors.document_number} </small>
        </p>
      {/if}
    </div>
  </div>

  <div class="text-right">
    <button type="submit" class="btn mt-8 py-1 px-10 ripple">Enviar</button>
  </div>
</form>

{#if isLoading}
  <Spinner />
{/if}

<style>
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus {
    transition: background-color 5000s ease-in-out 0s;
  }
</style>
