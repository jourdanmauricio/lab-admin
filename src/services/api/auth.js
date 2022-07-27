import Api from "../Api";
import ApiMl from "../ApiMl";
import { credentials, isLogged } from "./../../store/stores";
import { getSettings } from "./settings";

export const login = async (formUser) => {
  try {
    const response = await Api.post("/auth/login", formUser);
    console.log("User", response.user);
    Api.setAuth(response.token);

    isLogged.login();
    response.user.token = response.token;
    const settings = await getSettings(response.user.id);
    response.user.settings = settings.setting;

    credentials.setCredentials(response.user);

    if (response.user.userMl) {
      ApiMl.setAuth(response.user.userMl.access_token);
    }
    return response;
  } catch (error) {
    throw error;
  }
};
