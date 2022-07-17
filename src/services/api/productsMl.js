import ApiMl from "../ApiMl";
import Api from "../Api";
import { credentials } from "../../store/stores";
import { get } from "svelte/store";

export const getApiProductsMl = async (mlItems) => {
  const detItems = [];
  const req_items = [];
  const iteraciones = Math.ceil(mlItems.length / 20);
  for (let i = 0; i < iteraciones; i++) {
    req_items[i] = mlItems.splice(0, 20);
  }

  const req = await req_items.map((items2) => {
    return ApiMl.get(
      "items?ids=" +
        items2 +
        "&attributes=id,attributes,title,price,category_id,title,thumbnail,available_quantity,sold_quantity,status,pictures,sale_terms,variations,start_time,description"
    )
      .then((res) => res.forEach((element) => detItems.push(element.body)))
      .catch((err) => console.log(err));
  });
  await Promise.all(req).then(() => {});
  return detItems;
};

export const getApiItemsMl = async () => {
  try {
    const user = get(credentials);
    const itemsId = await ApiMl.get(
      `users/${user.userMl.mlUserId}/items/search`
    );
    return itemsId;
  } catch (error) {
    let message = "";
    message = error.response.data
      ? `${error.response.data.status} ${error.response.data.error}: ${error.response.data.message}`
      : "Error Obteniendo usuario ML 😞";
    console.log("Error", error.response.data);
    throw message;
  }
};

export const getProductsMl = async () => {
  try {
    const productsMl = await Api.get("productsml");
    return productsMl;
  } catch (error) {
    return error;
  }
};

export const postproductsMl = async (newProducts) => {
  try {
    console.log("createProductsMl", newProducts);
    const results = await Promise.all(
      newProducts.map(async (prod) => {
        const newProd = {
          prodId: prod.id,
          price: prod.price,
          quantity: prod.quantity,
          status: prod.status,
          startTime: prod.startTime,
        };
        await Api.post("/productsMl", newProd);
      })
    );
    return results;
  } catch (error) {
    console.log("ERRORRRR", error);
    let message = "";
    message = error.response.data
      ? `${error.response.data.statusCode}: ${error.response.data.message}`
      : "Error Creando categoría 😞";
    throw message;
  }
};
