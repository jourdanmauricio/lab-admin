var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  A: () => API
});
module.exports = __toCommonJS(stdin_exports);
var import_axios = __toESM(require("axios"));
var import_stores_c1931941 = require("./stores-c1931941.js");
const axiosAPI = import_axios.default.create({
  baseURL: import_stores_c1931941.v.basePath
});
const apiRequest = (method, url, request) => {
  console.log("Method - url", method, url);
  const headers = {};
  return axiosAPI({
    method,
    url,
    data: request,
    headers
  }).then((res) => {
    return Promise.resolve(res.data);
  }).catch((err) => {
    return Promise.reject(err);
  });
};
const get = (url, request) => apiRequest("get", url, request);
const deleteRequest = (url, request) => apiRequest("delete", url, request);
const post = (url, request) => apiRequest("post", url, request);
const put = (url, request) => apiRequest("put", url, request);
const patch = (url, request) => apiRequest("patch", url, request);
const setAuth = (token) => {
  axiosAPI.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
const API = {
  get,
  delete: deleteRequest,
  post,
  put,
  patch,
  setAuth
};
