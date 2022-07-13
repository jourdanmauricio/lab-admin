import Api from "../Api";
import { credentials } from "../../store/stores";
import { get } from "svelte/store";

export const authMl = async (data) => {
  try {
    const response = await Api.post("/usersml/authML", data);
    console.log("response", response);
    return response;
  } catch (error) {
    console.log("ERROR ", error);
    let message = "";
    message = error.response.data
      ? `${error.response.data.statusCode}: ${error.response.data.message}`
      : "Error Obteniendo URI ML 😞";
    throw message;
  }
};

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

export const delUserMl = async () => {
  try {
    const user = get(credentials);
    const response = await Api.delete(`/usersml/${user.userMl.id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
