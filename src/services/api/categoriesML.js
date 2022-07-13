import { variables } from "$lib/variables";

export const searchPredictor = async (value) => {
  try {
    const res = await fetch(
      `${variables.basePathML}/sites/MLA/domain_discovery/search?q=${value}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const response = await res.json();
    console.log("response pedictor: ", response);

    if (response.length === 0) throw "Intenta con otra palabra";

    let results = [];

    try {
      results = await Promise.all(
        response.map((cat) =>
          fetch(`${variables.basePathML}/categories/${cat.category_id}`).then(
            (res) => res.json()
          )
        )
      );
    } catch (error) {
      console.log(error);
    }

    // await Promise.all(
    //   response.map((cat) =>
    //     ApiML.get(`/categories/${cat.category_id}`).then((data) =>
    //       results.push(data)
    //     )
    //   )
    // );
    return results;
  } catch (error) {
    console.log("error predictor", error);
    throw error;
  }
};

export const getAtribsCat = async (catId) => {
  const urls = [
    `https://api.mercadolibre.com/categories/${catId}/attributes`,
    `https://api.mercadolibre.com/categories/${catId}/technical_specs/input`,
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
