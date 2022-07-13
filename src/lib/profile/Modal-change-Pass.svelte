<script>
  import { changePassword } from "./../../services/api/profile.js";
  import { credentials, notification } from "./../../store/stores";
  import Modal2 from "./../Modal2.svelte";
  import { validateFields } from "./../../helpers/validateFileds";
  import Spinner from "../Spinner.svelte";

  let modalChangePass;
  let isLoading = false;
  let errors = {};
  let oldPassword = "";
  let newPassword = "";
  let confirmPassword = "";

  function resetFieldError(e) {
    delete errors[e.target.name];
    errors = errors;
  }

  async function formHandle(event) {
    const formData = new FormData(event.target);
    /* isPassword, isConfirmPassword, isEmail, isName, isPhone, isDocument, none, isRequired */
    formData.append("oldPassword", "isPassword");
    formData.append("newPassword", "isPassword");
    formData.append("confirmPassword", "isConfirmPassword");
    errors = validateFields(formData);

    if (Object.keys(errors).length === 0) {
      isLoading = true;
      const body = {
        id: $credentials.id,
        email: $credentials.email,
        password: oldPassword,
        newPassword,
      };
      try {
        await changePassword(body);

        notification.show("Contraseña modificada", "success");
        modalChangePass.hide();
      } catch (err) {
        notification.show(err, "error");
      } finally {
        isLoading = false;
      }
    }
  }

  function modalShow() {
    oldPassword = "";
    newPassword = "";
    confirmPassword = "";
    modalChangePass.show();
  }
</script>

<button class="btn ripple " on:click={modalShow}>Cambiar contraseña</button>

<Modal2 bind:this={modalChangePass}>
  <section class="flex flex-col justify-center">
    <h2 class="text-2xl">Cambiar contraseña</h2>
    <div class="py-4">
      <div class="w-full border-t border-gray-900" />
    </div>
    <form on:submit|preventDefault={formHandle}>
      <div>
        <div class="relative mt-10">
          <input
            class="input-oval placeholder:tracking-normal"
            type="password"
            name="oldPassword"
            required="required"
            data-type="password"
            placeholder="Contraseña anterior"
            bind:value={oldPassword}
            on:input={resetFieldError}
          />
          {#if errors.oldPassword}
            <p class="error">
              <small style="color: red"> {errors.oldPassword} </small>
            </p>
          {/if}
        </div>
        <div class="relative mt-10">
          <input
            class="input-oval placeholder:tracking-normal"
            type="password"
            name="newPassword"
            required="required"
            placeholder="Nueva contraseña"
            bind:value={newPassword}
            on:input={resetFieldError}
          />
          {#if errors.newPassword}
            <p class="error">
              <small style="color: red"> {errors.newPassword} </small>
            </p>
          {/if}
        </div>
        <div class="relative mt-10">
          <input
            class="input-oval placeholder:tracking-normal"
            type="password"
            name="confirmPassword"
            required="required"
            placeholder="Confirmación contraseña"
            bind:value={confirmPassword}
            on:input={resetFieldError}
          />
          {#if errors.confirmPassword}
            <p class="error">
              <small style="color: red"> {errors.confirmPassword} </small>
            </p>
          {/if}
        </div>
        <div class="mt-10 flex justify-between">
          <button
            type="reset"
            class="ripple btn"
            on:click={() => modalChangePass.hide()}>Cancelar</button
          >
          <button class="btn ripple ml-10">Modificar</button>
        </div>
      </div>
    </form>

    {#if isLoading}
      <Spinner />
    {/if}
  </section>
</Modal2>
