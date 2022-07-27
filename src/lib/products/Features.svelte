<script>
  import Warranty from "./Warranty.svelte";
  import ListingType from "./ListingType.svelte";
  import Condition from "./Condition.svelte";
  import MaxQuantity from "./MaxQuantity.svelte";
  import Quantity from "./Quantity.svelte";
  import Price from "./Price.svelte";
  import Status from "./Status.svelte";
</script>

<div class="mt-8 grid gap-8 grid-cols-1 sm:grid-cols-2">
  <Status />
  <Price />
  <Quantity />
  <MaxQuantity />
  <Condition />
  <ListingType />
</div>
<div class="mt-8 grid gap-8 grid-cols-1 sm:grid-cols-4">
  <Warranty />
</div>
