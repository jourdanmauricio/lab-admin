<script>
  export let title;
  export let x;
  export let y;
</script>

<div
  style="
		top: {y + 20}px;
		left: {x - title.length * 2}px;"
>
  {@html title}
</div>

<style>
  div {
    color: white;
    border: 1px solid #222;
    background: #3339;
    border-radius: 4px;
    padding: 1px 4px;
    font-size: small;
    position: absolute;
  }
</style>
