import Api from "../Api";

export const getProducts = async (limit, offset, search) => {
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

export const postproducts = async (newProducts) => {
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
        prod2.mlId = prod.id;
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

export const patchProduct = async (products) => {
  try {
    const results = await Promise.all(
      products.map(async (prod) => {
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

        return await Api.patch(`/products/${newProd.id}`, newProd);
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

export const deleteProduct = async (items) => {
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
