import Api from "../Api";
import ApiMl from "../ApiMl";
import { credentials, product } from "../../store/stores";
import { get } from "svelte/store";

/*****************/
/***   Local   ***/
/*****************/

export const getLocalProducts = async (limit, offset, search) => {
  try {
    let paramSearch = !search ? "" : `&q=${search}`;
    const products = await Api.get(
      `/products?limit=${limit}&offset=${offset}${paramSearch}`
    );
    return products;
  } catch (error) {
    throw error;
  }
};

export const getLocalSkus = async () => {
  try {
    let skus = await Api.get("products/getSkus");
    return skus;
  } catch (error) {
    throw error;
  }
};

export const postLocalProducts = async (newProducts) => {
  try {
    const results = await Promise.all(
      newProducts.map(async (prod) => {
        const newProd = {
          ml_id: prod.id,
          attributes: prod.attributes,
          title: prod.title,
          seller_custom_field: prod.seller_custom_field,
          price: prod.price,
          available_quantity: prod.available_quantity,
          sold_quantity: prod.sold_quantity,
          status: prod.status,
          description: prod.description,
          pictures: prod.pictures,
          listing_type_id: prod.listing_type_id,
          condition: prod.condition,
          thumbnail: prod.thumbnail,
          category_id: prod.category_id,
          start_time: prod.start_time,
          sale_terms: prod.sale_terms,
          variations: prod.variations,
        };
        let prod2 = await Api.post("/products", newProd);
        prod2.ml_id = prod.id;
        // console.log("PRODID", prod2);
        return prod2;
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

export const patchLocalProduct = async (prod) => {
  try {
    const newProd = {
      id: prod.id,
      ml_id: prod.mlId,
      attributes: prod.attributes,
      description: prod.description,
      title: prod.title,
      seller_custom_field: prod.seller_custom_field,
      price: prod.price,
      available_quantity: prod.available_quantity,
      sold_quantity: prod.sold_quantity,
      status: prod.status,
      pictures: prod.pictures,
      listing_type_id: prod.listing_type_id,
      condition: prod.condition,
      thumbnail: prod.thumbnail,
      category_id: prod.category_id,
      start_time: prod.start_time,
      sale_terms: prod.sale_terms,
      variations: prod.variations,
    };

    const res = await Api.patch(`/products/${newProd.id}`, newProd);
    return res;
  } catch (error) {
    console.log("ERRORRRR", error);
    let message = "";
    message = error.response.data
      ? `${error.response.data.statusCode}: ${error.response.data.message}`
      : "Error Creando categoría 😞";
    throw message;
  }
};

export const deleteLocalProduct = async (prod) => {
  try {
    return await Api.delete(`/products/${prod.id}`);
  } catch (error) {
    console.log("Error", error);
    let message = "";
    message = res.statusText
      ? `${res.status}: ${res.statusText}`
      : "Error eliminando el producto 😞";
    throw message;
  }
};

export const deleteLocalProducts = async (items) => {
  try {
    const results = await Promise.all(
      items.map(async (prod) => {
        const res = await Api.delete(`/products/${prod.id}`);
        return res;
      })
    );
    return results;
  } catch (error) {
    console.log("Error", error);
    let message = "";
    message = res.statusText
      ? `${res.status}: ${res.statusText}`
      : "Error eliminando el producto 😞";
    throw message;
  }
};

/*******************/
/***   LocalMl   ***/
/*******************/

export const getLocalMlProducts = async () => {
  try {
    const productsMl = await Api.get("productsml");
    return productsMl;
  } catch (error) {
    return error;
  }
};

export const postLocalMlProducts = async (newProducts) => {
  try {
    const results = await Promise.all(
      newProducts.map(async (prod) => {
        const newProd = {
          id: prod.id,
          prod_id: prod.prod_id,
          seller_custom_field: prod.seller_custom_field,
          price: prod.price,
          available_quantity: prod.available_quantity,
          status: prod.status,
          permalink: prod.permalink,
          start_time: prod.start_time,
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

export const patchLocalMlProduct = async (prod) => {
  try {
    const newProd = {
      id: prod.id,
      prod_id: prod.prod_id,
      seller_custom_field: prod.seller_custom_field,
      price: prod.price,
      available_quantity: prod.available_quantity,
      status: prod.status,
      permalink: prod.permalink,
      start_time: prod.start_time,
    };
    return await Api.patch(`/productsMl/${newProd.id}`, newProd);
  } catch (error) {
    console.log("ERRORRRR", error);
    let message = "";
    message = error.response.data
      ? `${error.response.data.statusCode}: ${error.response.data.message}`
      : "Error modificando producto ML 😞";
    throw message;
  }
};

export const patchLocalMlProducts = async (mlItems) => {
  try {
    const results = await Promise.all(
      mlItems.map(async (prod) => {
        const newProd = {
          id: prod.id,
          prod_id: prod.prod_id,
          seller_custom_field: prod.seller_custom_field,
          price: prod.price,
          available_quantity: prod.available_quantity,
          status: prod.status,
          permalink: prod.permalink,
          start_time: prod.start_time,
        };
        return await Api.patch(`/productsMl/${newProd.id}`, newProd);
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

export const delLocalMlProduct = async (prod) => {
  try {
    return await Api.delete(`/productsMl/${prod.id}`);
  } catch (error) {
    console.log("ERRORRRR", error);
    let message = "";
    message = error.response.data
      ? `${error.response.data.statusCode}: ${error.response.data.message}`
      : "Error modificando producto ML 😞";
    throw message;
  }
};

/**************/
/***   Ml   ***/
/**************/

export const getMlItems = async () => {
  try {
    const user = get(credentials);
    const res = await ApiMl.get(`users/${user.userMl.ml_user_id}/items/search`);
    console.log("res", res);

    const cantItems = res.paging.total;
    const pages = [];
    let items = [];
    for (let i = 0; i < cantItems; i = i + res.paging.limit) pages.push(i);
    const requests = pages.map((i) => {
      return ApiMl.get(
        `users/${user.userMl.ml_user_id}/items/search?limit=${res.paging.limit}&offset=${i}`
      )
        .then((res) => res.results)
        .catch((err) => err);
    });
    await Promise.all(requests).then((values) => (items = values.flat()));
    return items;
    // return itemsId;
  } catch (error) {
    let message = "";
    console.log("ERROR", error);
    // message = error.response.data
    //   ? `${error.response.data.status} ${error.response.data.error}: ${error.response.data.message}`
    //   : "Error Obteniendo usuario ML 😞";
    // console.log("Error", error.response.data);
    throw error;
  }
};

export const getMlProducts = async (mlItems) => {
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
        "&attributes=id,attributes,title,price,category_id,title,thumbnail,listing_type_id,condition,available_quantity,sold_quantity,status,permalink,pictures,sale_terms,variations,start_time,seller_custom_field"
    )
      .then((res) => {
        res.forEach(async (element) => {
          await ApiMl.get(`items/${element.body.id}/description`)
            .then((resDesc) => {
              element.body.description = resDesc.plain_text;
            })
            .catch((err) => {
              if ((err.response.status = 404)) element.body.description = "";
            })
            .finally(() => {
              detItems.push(element.body);
            });
        });
      })
      .catch((err) => console.log(err));
  });
  await Promise.all(req).then(() => {});
  return detItems;
};

export const patchMlProducts = async (mlItems) => {
  try {
    const results = await Promise.all(
      mlItems.map(async (prod) => {
        let id = prod.id;
        delete prod.id;
        return await ApiMl.put(`items/${id}`, prod);
      })
    );
    return results;
  } catch (error) {
    console.log("ERR!!!!", error);
    let message = "";
    if (error.response.data) {
      message = `${error.response.status}: ${error.response.data.message}`;
      if (error.response.data.cause.length > 0) {
        error.response.data.cause.forEach((el) => {
          if (el.type === "error") message += `<br> ${el.message}`;
        });
      }
    }
    if (message === "") message = "Error modificando el producto 😞";
    throw message;
  }
};

export const patchMlProduct = async (mlItem) => {
  try {
    let id = mlItem.id;
    delete mlItem.id;
    return await ApiMl.put(`items/${id}`, mlItem);
  } catch (error) {
    console.log("ERR!!!!", error);
    let message = "";
    if (error.response.data) {
      message = `${error.response.status}: ${error.response.data.message}`;
      if (error.response.data.cause.length > 0) {
        error.response.data.cause.forEach((el) => {
          if (el.type === "error") message += `<br> ${el.message}`;
        });
      }
    }
    if (message === "") message = "Error modificando el producto 😞";
    throw message;
  }
};

export const patchMlDescription = async (descriptions) => {
  try {
    const results = await Promise.all(
      descriptions.map(async (description) => {
        let id = description.id;
        delete description.id;
        return await ApiMl.put(
          `items/${id}/description?api_version=2`,
          description
        );
      })
    );
    return results;
  } catch (error) {
    console.log("ERR!!!!", error);
    let message = "";
    if (error.response.data) {
      message = `${error.response.status}: ${error.response.data.message}`;
      if (error.response.data.cause.length > 0) {
        error.response.data.cause.forEach((el) => {
          if (el.type === "error") message += `<br> ${el.message}`;
        });
      }
    }
    if (message === "") message = "Error modificando la descripción 😞";
    throw message;
  }
};

/********************/
/***   Service   ****/
/********************/

export const serviceUpdProduct = async (body, apps, feature) => {
  console.log("apps", apps);
  console.log("feature", feature);
  try {
    const prod = get(product);
    switch (apps) {
      case "ML":
        body.id = prod.prodMl.id;
        const resApi = await patchMlProduct(body);
        console.log("resApi", resApi);
        resApi.prod_id = prod.id;
        const resMl = await patchLocalMlProduct(resApi);
        break;
      case "LOCAL":
        body.id = prod.id;
        const res = await patchLocalProduct(body);
        break;
      case "ML-LOCAL":
        if (feature === "PRODUCT") {
          body.id = prod.prodMl.id;
          console.log("ML");
          const resApi = await patchMlProduct(body);
          resApi.prod_id = prod.id;
          console.log("ML-LOCAL");
          const resMl = await patchLocalMlProduct(resApi);
          console.log("resMl", resMl);
          resApi.id = prod.id;
          delete resApi.status;
          delete resApi.available_quantity;
          delete resApi.price;
          delete resApi.sold_quantity;
          delete resApi.start_time;
          console.log("LOCAL");
          console.log("resApi", resApi);
          await patchLocalProduct(resApi);
          return;
        }
        if (feature === "DESCRIPTION") {
          body.id = prod.prodMl.id;
          const descriptionMl = await patchMlDescription([body]);
          const description = {
            id: prod.id,
            description: descriptionMl[0].plain_text,
          };
          await patchLocalProduct([description]);
          return;
        }
        break;
      case "WEB-LOCAL":
        break;
      case "ALL":
        break;
    }
  } catch (error) {
    throw error;
  }
};
