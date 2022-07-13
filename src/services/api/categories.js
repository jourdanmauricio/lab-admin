import Api from "../Api";

export const getCategories = async (limit, offset, search) => {
  try {
    let paramSearch = !search ? "" : `&q=${search}`;
    const response = await Api.get(
      `/categories?limit=${limit}&offset=${offset}${paramSearch}`
    );
    return response;
  } catch (error) {
    console.log("error", error);
    let message = "";
    message = error.response.data
      ? `${error.response.data.statusCode}: ${error.response.data.message}`
      : "Error Obteniendo categoría 😞";
    throw message;
  }
};

export const createCategory = async (newCategory) => {
  try {
    const response = await Api.post("/categories", newCategory);
    return response;
  } catch (error) {
    let message = "";
    message = error.response.data
      ? `${error.response.data.statusCode}: ${error.response.data.message}`
      : "Error Creando categoría 😞";
    throw message;
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    const res = await Api.delete(`/categories/${categoryId}`);
    return res;
  } catch (error) {
    console.log("Error", error);
    let message = "";
    message = res.statusText
      ? `${res.status}: ${res.statusText}`
      : "Error eliminando la categoría 😞";
    throw message;
  }
};
