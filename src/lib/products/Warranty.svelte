<script>
  import { product } from "../../store/stores";

  $: warrantyType = $product.sale_terms.find(
    (saleTerm) => saleTerm.id === "WARRANTY_TYPE"
  );

  $: warrantyTime = $product.sale_terms.find(
    (saleTerm) => saleTerm.id === "WARRANTY_TIME"
  );

  function handleChange(e) {
    console.log("e", e.target.id, e.target.value);

    let sale_terms = $product.sale_terms;

    let found;
    switch (e.target.id) {
      case "warrantyType":
        found = sale_terms.find((el) => el.id === "WARRANTY_TYPE");
        if (found) {
          found.value_name = e.target.value;
        } else {
          sale_terms.push({
            id: "WARRANTY_TYPE",
            value_name: e.target.value,
          });
        }
        break;
      case "warrantyTime":
        found = sale_terms.find((el) => el.id === "WARRANTY_TIME");
        if (found) {
          let value = e.target.value + " " + found.value_name.split(" ")[1];
          found.value_name = value;
        } else {
          sale_terms.push({
            id: "WARRANTY_TIME",
            value_name: e.target.value,
          });
        }
        break;
      case "warrantyUnit":
        found = sale_terms.find((el) => el.id === "WARRANTY_TIME");
        if (found) {
          let value = found.value_name.split(" ")[0] + " " + e.target.value;
          found.value_name = value;
        } else {
          sale_terms.push({
            id: "WARRANTY_TIME",
            value_name: e.target.value,
          });
        }
        break;
    }

    product.update({ sale_terms: sale_terms });
  }
</script>

<!-- "values": [
  {
    "id": "2230280",
    "name": "Garantía del vendedor"
  },
  {
    "id": "2230279",
    "name": "Garantía de fábrica"
  },
  {
    "id": "6150835",
    "name": "Sin garantía"
  } -->

<div class="relative col-span-2">
  <select
    on:change={handleChange}
    value={warrantyType ? warrantyType.value_name : ""}
    class="input-oval"
    name="warrantyType"
    id="warrantyType"
  >
    <option value="Garantía de fábrica">Garantía de fábrica</option>
    <option value="Garantía del vendedor">Garantía del vendedor</option>
    <option value="Sin garantía">Sin garantía</option>
  </select>
  <label class="label-oval" for="warrantyType">Tipo de grarantía</label>
</div>

<div class="relative">
  <input
    value={warrantyTime ? warrantyTime.value_name.split(" ")[0] : ""}
    on:change={handleChange}
    class="input-oval"
    type="number"
    name="warrantyTime"
    id="warrantyTime"
    step="1"
  />
  <label class="label-oval" for="warrantyTime">Tiempo</label>
</div>

<div class="relative">
  <select
    on:change={handleChange}
    value={warrantyTime ? warrantyTime.value_name.split(" ")[1] : ""}
    class="input-oval"
    name="warrantyUnit"
    id="warrantyUnit"
  >
    <option value="días">Días</option>
    <option value="meses">Meses</option>
    <option value="años">Años</option>
  </select>
  <label class="label-oval" for="warrantyUnit">Unidad</label>
</div>
