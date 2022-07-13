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
