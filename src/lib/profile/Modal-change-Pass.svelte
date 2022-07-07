<script>
  import { credentials, notification } from "./../../store/stores";
  import { onMount } from "svelte";
  import Modal, { getModal } from "./../Modal.svelte";
  import { variables } from "$lib/variables";
  import { validateFields } from "./../../helpers/validateFileds";
  import Spinner from "../Spinner.svelte";

  let openModal = false;
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
      try {
        const res = await fetch(
          `${variables.basePath}/users/change-password/${$credentials.id}`,
          {
            method: "PATCH",
            body: JSON.stringify({
              id: $credentials.id,
              email: $credentials.email,
              password: oldPassword,
              newPassword,
            }),
            headers: {
              "content-type": "application/json",
            },
          }
        );
        const data = await res.json();
        if (res.status === 200) {
          notification.show("Contraseña modificada", "success");
          getModal().close();
        } else {
          let message = res.statusText
            ? `${res.status}: ${res.statusText}`
            : "Error actualizando el perfil 😞";
          throw message;
        }
      } catch (err) {
        notification.show(err, "error");
      } finally {
        isLoading = false;
      }
    }
  }

  onMount(() => {
    openModal = true;
  });

  function closeModal() {
    oldPassword = "";
    newPassword = "";
    confirmPassword = "";
  }
</script>

<button class="btn ripple " on:click={() => getModal().open(closeModal)}
  >Cambiar contraseña</button
>

{#if openModal}
  <Modal>
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
          <button class="btn ripple w-full mt-10">Modificar</button>
        </div>
      </form>

      {#if isLoading}
        <Spinner />
      {/if}
    </section>
  </Modal>
{/if}
