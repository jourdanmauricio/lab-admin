import Api from "../Api";
import ApiMl from "../ApiMl";
import { credentials, isLogged } from "./../../store/stores";

export const login = async (formUser) => {
  try {
    const response = await Api.post("/auth/login", formUser);
    console.log("User", response.user);
    Api.setAuth(response.token);

    isLogged.login();
    response.user.token = response.token;
    credentials.setCredentials(response.user);

    if (response.user.userMl) {
      ApiMl.setAuth(response.user.userMl.accessToken);
    }
    return response;
  } catch (error) {
    throw error;
  }
};
