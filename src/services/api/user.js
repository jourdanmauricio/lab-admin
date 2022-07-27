import { variables } from "../../lib/variables";
import Api from "../Api";

export const postUser = async (user) => {
  try {
    const newUser = await Api.post(`${variables.basePath}/users/admin`, user);
    return newUser;
  } catch (error) {
    let message = "";
    message = error.response.data
      ? `${error.response.data.statusCode}: ${error.response.data.message}`
      : "Error Obteniendo configuración 😞";
    throw message;
  }
};
