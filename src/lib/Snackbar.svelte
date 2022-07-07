<script>
  import { notification } from "../store/stores";
  function handleType() {
    let classes = `snackbar ${$notification.type} `;
    if ($notification.show) classes += "show ";
    return classes;
  }
</script>

{#if $notification.show}
  <div class={handleType()} on:click={notification.clear}>
    {$notification.message}
  </div>
{/if}

<style>
  .snackbar {
    visibility: hidden;
    min-width: 250px;
    margin-left: -125px;
    background-color: #333;
    color: #fff;
    text-align: center;
    border-radius: 4px;
    padding: 16px;
    position: fixed;
    z-index: 1;
    right: 1%;
    top: 50px;
    font-size: 17px;
  }

  .error {
    background-color: red;
  }

  .success {
    background-color: green;
  }

  .info {
    background-color: #333;
  }

  .snackbar.show {
    visibility: visible;
    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
    animation: fadein 0.5s, fadeout 0.5s 2.5s;
  }

  @-webkit-keyframes fadein {
    from {
      top: 0;
      opacity: 0;
    }
    to {
      top: 50px;
      opacity: 1;
    }
  }

  @keyframes fadein {
    from {
      top: 0;
      opacity: 0;
    }
    to {
      top: 50px;
      opacity: 1;
    }
  }

  @-webkit-keyframes fadeout {
    from {
      top: 50px;
      opacity: 1;
    }
    to {
      top: 0;
      opacity: 0;
    }
  }

  @keyframes fadeout {
    from {
      top: 50px;
      opacity: 1;
    }
    to {
      top: 0;
      opacity: 0;
    }
  }
</style>
