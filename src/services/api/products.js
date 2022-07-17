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
          attributes: prod.attributes,
          name: prod.title,
          price: prod.price,
          quantity: prod.available_quantity,
          soldQuantity: prod.sold_quantity,
          status: prod.status,
          pictures: prod.pictures,
          thumbnail: prod.thumbnail,
          categoryId: prod.category_id,
          startTime: prod.start_time,
          saleTerms: prod.sale_terms,
          variations: prod.variations,
        };
        await Api.post("/products", newProd);
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

export const deleteProduct = async (id) => {
  try {
    const res = await Api.delete(`/products/${id}`);
    return res;
  } catch (error) {
    console.log("Error", error);
    let message = "";
    message = res.statusText
      ? `${res.status}: ${res.statusText}`
      : "Error eliminando el producto 😞";
    throw message;
  }
};
