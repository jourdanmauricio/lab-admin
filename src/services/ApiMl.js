import axios from "axios";
import { variables } from "$lib/variables";
import { credentials } from "../store/stores";
import { get as getStore } from "svelte/store";
import Api from "./Api";

// Create a instance of axios to use the same base url.
const axiosAPI = axios.create({
  baseURL: variables.basePathMl,
});

function refreshToken() {
  const user = getStore(credentials);
  return axiosAPI.post("/oauth/token", {
    grant_type: "refresh_token",
    client_id: variables.mlAppId,
    client_secret: variables.mlSecret,
    refresh_token: user.userMl.refreshToken,
  });
}

// axiosAPI.interceptors.request.use(function () {
//   console.log("INTERCEPTOR REQUEST");
// });

axiosAPI.interceptors.response.use(
  function (response) {
    console.log("INTERCEPTOR RESPONSE1");
    return response;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log("INTERCEPTOR RESPONSE2");
    const originalConfig = err.config;
    if (err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        console.log("Access Token was expired");
        originalConfig._retry = true;
        try {
          const userStore = getStore(credentials);
          const rs = await refreshToken();
          const user = await Api.put(`/usersml/${userStore.userMl.id}`, rs);
          credentials.setCredentials(user);
          localStorage.setItem("user", JSON.stringify(user));
          setAuth(rs.access_token);
          return instance(originalConfig);
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

// implement a method to execute all the request from here.
const apiRequest = (method, url, request) => {
  console.log("Method - url", method, url);
  const headers = {
    // Authorization: `Bearer ${user.token}`,
  };
  //using the axios instance to perform the request that received from each http method
  return axiosAPI({
    method,
    url,
    data: request,
    headers,
  })
    .then((res) => {
      return Promise.resolve(res.data);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

// function to execute the http get request
const get = (url, request) => apiRequest("get", url, request);

// function to execute the http delete request
const deleteRequest = (url, request) => apiRequest("delete", url, request);

// function to execute the http post request
const post = (url, request) => apiRequest("post", url, request);

// function to execute the http put request
const put = (url, request) => apiRequest("put", url, request);

// function to execute the http path request
const patch = (url, request) => apiRequest("patch", url, request);

const setAuth = (token) => {
  axiosAPI.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// expose your method to other services or actions
const API = {
  get,
  delete: deleteRequest,
  post,
  put,
  patch,
  setAuth,
};
export default API;
