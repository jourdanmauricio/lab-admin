var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if ((from && typeof from === "object") || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
        });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (
  (target = mod != null ? __create(__getProtoOf(mod)) : {}),
  __copyProps(
    isNodeMode || !mod || !mod.__esModule
      ? __defProp(target, "default", { value: mod, enumerable: true })
      : target,
    mod
  )
);
var import_axios = __toESM(require("axios"));
var import_stores_c1931941 = require("./stores-c1931941.js");
var import_index_7bf676ca = require("./index-7bf676ca.js");
var import_Api_a77dc7b1 = require("./Api-a77dc7b1.js");
const axiosAPI = import_axios.default.create({
  baseURL: import_stores_c1931941.v.basePathMl,
});
function refresh_token() {
  const user = (0, import_index_7bf676ca.g)(import_stores_c1931941.c);
  const data = {
    grant_type: "refresh_token",
    client_id: import_stores_c1931941.v.mlAppId,
    client_secret: import_stores_c1931941.v.mlSecret,
    refresh_token: user.userMl.refresh_token,
  };
  return import_axios.default.post(
    "https://api.mercadolibre.com/oauth/token",
    JSON.stringify(data)
  );
}
axiosAPI.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (err) {
    console.log("INTERCEPTOR RESPONSE2");
    const originalConfig = err.config;
    if (err.response) {
      console.log("err.response", err.response);
      if (err.response.status === 401 && !originalConfig._retry) {
        console.log("Access Token was expired");
        originalConfig._retry = true;
        try {
          const userStore = (0, import_index_7bf676ca.g)(
            import_stores_c1931941.c
          );
          const rs = await refresh_token();
          console.log("rs", rs);
          const data = {
            access_token: rs.data.access_token,
            expires_in: rs.data.expires_in,
            refresh_token: rs.data.refresh_token,
            scope: rs.data.scope,
            token_type: rs.data.token_type,
            user_id: userStore.id,
          };
          const user = await import_Api_a77dc7b1.A.put(
            `/usersml/${userStore.userMl.id}`,
            data
          );
          import_stores_c1931941.c.setCredentials(user);
          localStorage.setItem("user", JSON.stringify(user));
          setAuth(rs.access_token);
          return axiosAPI(originalConfig);
        } catch (_error) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }
          return Promise.reject(_error);
        }
      }
      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
    }
    return Promise.reject(error);
  }
);
const setAuth = (token) => {
  axiosAPI.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
