import Api from "../Api";
import { credentials } from "../../store/stores";
import { get } from "svelte/store";

export const getUserMl = async () => {
  try {
    const user = get(credentials);
    const response = await Api.get(`/usersml/${user.id}`);
    console.log("response", response);
    return response;
  } catch (error) {
    console.log("error", error);
    let message = "";
    message = error.response.data
      ? `${error.response.data.statusCode}: ${error.response.data.message}`
      : "Error Obteniendo usuario ML 😞";
    throw message;
  }
};
