import axios from "axios";
import { variables } from "$lib/variables";

// Create a instance of axios to use the same base url.
console.log("variables.basePath", variables.basePath);
console.log("variables.basePathMl", variables.basePathMl);
const axiosAPI = axios.create({
  baseURL: variables.basePathMl,
});

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
