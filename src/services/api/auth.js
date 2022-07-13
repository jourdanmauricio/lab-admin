import Api from "../Api";
import { credentials, isLogged } from "./../../store/stores";

export const login = async (formUser) => {
  try {
    const response = await Api.post("/auth/login", formUser);
    console.log("User", response.user);
    Api.setAuth(response.token);
    isLogged.login();
    response.user.token = response.token;
    credentials.setCredentials(response.user);
    return response;
  } catch (error) {
    throw error;
  }
};

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
