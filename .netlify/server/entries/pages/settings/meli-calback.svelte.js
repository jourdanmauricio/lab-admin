var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  default: () => Meli_calback
});
module.exports = __toCommonJS(stdin_exports);
var import_index_9af3cff5 = require("../../../immutable/chunks/index-9af3cff5.js");
var import_Spinner_0a5d3b24 = require("../../../immutable/chunks/Spinner-0a5d3b24.js");
var import_stores_9f7492a1 = require("../../../immutable/chunks/stores-9f7492a1.js");
const Meli_calback = (0, import_index_9af3cff5.c)(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = (0, import_index_9af3cff5.a)(import_stores_9f7492a1.p, (value) => $page = value);
  $page.url.searchParams("code");
  $page.url.searchParams("state");
  $$unsubscribe_page();
  return `${`${(0, import_index_9af3cff5.v)(import_Spinner_0a5d3b24.S, "Spinner").$$render($$result, {}, {}, {})}`}`;
});
