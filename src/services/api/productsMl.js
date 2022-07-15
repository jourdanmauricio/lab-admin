import ApiMl from "../ApiMl";
import { credentials } from "../../store/stores";
import { get } from "svelte/store";

export const getApiProductsMl = async (mlItems) => {
  const detItems = [];
  const req_items = [];
  const iteraciones = Math.ceil(mlItems.length / 20);
  for (let i = 0; i < iteraciones; i++) {
    req_items[i] = mlItems.splice(0, 20);
  }

  console.log("req_items", req_items);

  const req = await req_items.map((items2) => {
    return ApiMl.get(
      "items?ids=" + items2 + "&attributes=id,price,category_id,title,thumbnail"
    )
      .then((res) => {
        console.log("res", res);
        res.forEach((element) => detItems.push(element.body));
      })
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
