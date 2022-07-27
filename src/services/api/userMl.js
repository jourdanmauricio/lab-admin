import Api from "../Api";
import ApiMl from "../ApiMl";
import { credentials } from "../../store/stores";
import { variables } from "../../lib/variables";
import { get } from "svelte/store";

export const getUserMl = async () => {
  try {
    const user = get(credentials);
    const response = await Api.get(`/usersml/${user.id}`);
    return response;
  } catch (error) {
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
    credentials.setCredentials(response);
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

export const replaceCode = async (code) => {
  try {
    // GET ML -> change code for access_token

    const data = {
      grant_type: "authorization_code",
      client_id: variables.mlAppId,
      client_secret: variables.mlSecret,
      code: code,
      redirect_uri: `${variables.frontend}/settings/meli-callback`,
    };

    const url = `${variables.basePathMl}/oauth/token`;

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const res = await response.json();

    ApiMl.setAuth(res.access_token);

    return res;
  } catch (error) {
    console.log("error", error);
    let message = "";
    message = error.response.data
      ? `${error.response.data.statusCode}: ${error.response.data.message}`
      : "Error obteniendo token ML 😞";
    throw message;
  }
};

export const getApiMlUser = async (ml_user_id) => {
  try {
    const mlUser = await ApiMl.get(`/users/${ml_user_id}`);
    return mlUser;
  } catch (error) {
    console.log("error", error);
    let message = "";
    message = error.response.data
      ? `${error.response.data.statusCode}: ${error.response.data.message}`
      : "Error obteniendo token ML 😞";
    throw message;
  }
};

export const createUserMl = async (userMl) => {
  const user = get(credentials);
  Api.setAuth(user.token);
  try {
    const user = await Api.post("/usersml", userMl);
    credentials.setCredentials(user);
    return user;
  } catch (error) {
    console.log("ERRRRRRRROR", error);
    let message = "";
    message = error.response.data
      ? `${error.response.data.statusCode}: ${error.response.data.message}`
      : "Error actualizando user ML 😞";
    throw message;
  }
};
