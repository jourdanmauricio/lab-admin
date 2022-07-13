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
  manifest: () => manifest
});
module.exports = __toCommonJS(stdin_exports);
const manifest = {
  appDir: "_app",
  assets: /* @__PURE__ */ new Set(["favicon.png"]),
  mimeTypes: { ".png": "image/png" },
  _: {
    entry: { "file": "immutable/start-534efc01.js", "imports": ["immutable/start-534efc01.js", "immutable/chunks/index-4f1ad350.js", "immutable/chunks/index-aee7e1b1.js", "immutable/chunks/singletons-cdeec3fd.js"], "stylesheets": [] },
    nodes: [
      () => Promise.resolve().then(() => __toESM(require("./nodes/0.js"))),
      () => Promise.resolve().then(() => __toESM(require("./nodes/1.js"))),
      () => Promise.resolve().then(() => __toESM(require("./nodes/9.js"))),
      () => Promise.resolve().then(() => __toESM(require("./nodes/2.js"))),
      () => Promise.resolve().then(() => __toESM(require("./nodes/3.js"))),
      () => Promise.resolve().then(() => __toESM(require("./nodes/8.js"))),
      () => Promise.resolve().then(() => __toESM(require("./nodes/4.js"))),
      () => Promise.resolve().then(() => __toESM(require("./nodes/10.js"))),
      () => Promise.resolve().then(() => __toESM(require("./nodes/5.js"))),
      () => Promise.resolve().then(() => __toESM(require("./nodes/11.js"))),
      () => Promise.resolve().then(() => __toESM(require("./nodes/6.js"))),
      () => Promise.resolve().then(() => __toESM(require("./nodes/12.js"))),
      () => Promise.resolve().then(() => __toESM(require("./nodes/7.js"))),
      () => Promise.resolve().then(() => __toESM(require("./nodes/14.js"))),
      () => Promise.resolve().then(() => __toESM(require("./nodes/13.js")))
    ],
    routes: [
      {
        type: "page",
        id: "",
        pattern: /^\/$/,
        names: [],
        types: [],
        path: "/",
        shadow: null,
        a: [0, 2],
        b: [1]
      },
      {
        type: "page",
        id: "dashboard",
        pattern: /^\/dashboard\/?$/,
        names: [],
        types: [],
        path: "/dashboard",
        shadow: null,
        a: [0, 3, 4, 5],
        b: [1, 1]
      },
      {
        type: "page",
        id: "products",
        pattern: /^\/products\/?$/,
        names: [],
        types: [],
        path: "/products",
        shadow: null,
        a: [0, 3, 6, 7],
        b: [1, 1]
      },
      {
        type: "page",
        id: "profile",
        pattern: /^\/profile\/?$/,
        names: [],
        types: [],
        path: "/profile",
        shadow: null,
        a: [0, 3, 8, 9],
        b: [1, 1]
      },
      {
        type: "page",
        id: "settings",
        pattern: /^\/settings\/?$/,
        names: [],
        types: [],
        path: "/settings",
        shadow: null,
        a: [0, 3, 10, 11],
        b: [1, 1]
      },
      {
        type: "page",
        id: "users",
        pattern: /^\/users\/?$/,
        names: [],
        types: [],
        path: "/users",
        shadow: null,
        a: [0, 3, 12, 13],
        b: [1, 1]
      },
      {
        type: "page",
        id: "settings/meli-calback",
        pattern: /^\/settings\/meli-calback\/?$/,
        names: [],
        types: [],
        path: "/settings/meli-calback",
        shadow: null,
        a: [0, 3, 10, 14],
        b: [1, 1]
      }
    ],
    matchers: async () => {
      return {};
    }
  }
};
