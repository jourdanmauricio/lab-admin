import Api from "../Api";
import { credentials } from "../../store/stores";
import { variables } from "../../lib/variables";
import { get } from "svelte/store";
import axios from "axios";

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
    console.log("error", error);
    let message = "";
    message = error.response.data
      ? `${error.response.data.statusCode}: ${error.response.data.message}`
      : "Error eliminando usuario ML 😞";
    throw message;
  }
};

export const replaceCode = async (code, state) => {
  try {
    // GET ML -> change code for access_token

    const credentialsMl = await axios({
      method: "post",
      url: `${config.mlApi}/oauth/token`,
      data: {
        grant_type: "authorization_code",
        client_id: variables.mlAppId,
        client_secret: variables.mlSecret,
        code: code,
        redirect_uri: `${variables.frontend}/settings/meli-callback`,
      },
    });
    // const rta = await service.update(state, resMl);
    console.log("CredentialsMl: ", credentialsMl);
  } catch (error) {
    console.log("error", error);
    let message = "";
    message = error.response.data
      ? `${error.response.data.statusCode}: ${error.response.data.message}`
      : "Error obteniendo token ML 😞";
    throw message;
  }
};
