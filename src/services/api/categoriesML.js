import { variables } from "$lib/variables";
import axios from "axios";

export const getApiCategoriesMl = async (mlCategoriesIds) => {
  try {
    return await Promise.all(
      mlCategoriesIds.map(async (cat) => {
        let mlCategory = await axios(
          `${variables.basePathMl}/categories/${cat}`
        );
        let atribs = await getAtribsCat(cat);

        let full_name = "";
        mlCategory.data.path_from_root.forEach((parent, index) => {
          full_name += index === 0 ? parent.name : ` / ${parent.name}`;
        });

        const newCategory = {
          id: mlCategory.data.id,
          name: mlCategory.data.name,
          full_name: full_name,
          path_from_root: mlCategory.data.path_from_root,
          children_categories: mlCategory.data.children_categories,
          settings: mlCategory.data.settings,
          picture: mlCategory.data.picture,
          attributes: atribs[0],
          attributes_oblg: atribs[1],
        };
        return newCategory;
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export const searchPredictor = async (value) => {
  try {
    const res = await axios(
      `${variables.basePathMl}/sites/MLA/domain_discovery/search?q=${value}`
    );
    const response = res.data;
    console.log("response pedictor: ", response);

    let categoriesMl = [];
    response.forEach((cat) => categoriesMl.push(cat.category_id));

    if (response.length === 0) throw "Intenta con otra palabra";

    const results = await getApiCategoriesMl(categoriesMl);
    console.log("results", results);

    return results;
  } catch (error) {
    console.log("error predictor", error);
    throw error;
  }
};

export const getAtribsCat = async (catId) => {
  const urls = [
    `${variables.basePathMl}/categories/${catId}/attributes`,
    `${variables.basePathMl}/categories/${catId}/technical_specs/input`,
  ];
  try {
    const atribs = await Promise.all(
      urls.map((url) => fetch(url).then((res) => res.json()))
    );
    return atribs;
  } catch (error) {
    throw error;
  }
};

export const getApiAllCategoriesMl = async () => {
  try {
    const categories = await axios(
      `${variables.basePathMl}/sites/MLA/categories`
    );
    return categories.data;
  } catch (error) {
    throw error;
  }
};
