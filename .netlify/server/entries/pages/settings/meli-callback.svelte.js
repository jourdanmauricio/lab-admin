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
  default: () => Meli_callback
});
module.exports = __toCommonJS(stdin_exports);
var import_index_7bf676ca = require("../../../immutable/chunks/index-7bf676ca.js");
var import_Spinner_409a666b = require("../../../immutable/chunks/Spinner-409a666b.js");
var import_stores_5517d273 = require("../../../immutable/chunks/stores-5517d273.js");
var import_Api_a77dc7b1 = require("../../../immutable/chunks/Api-a77dc7b1.js");
var import_ApiMl_f5c181ef = require("../../../immutable/chunks/ApiMl-f5c181ef.js");
var import_stores_c1931941 = require("../../../immutable/chunks/stores-c1931941.js");
var import_axios = require("axios");
const Meli_callback = (0, import_index_7bf676ca.c)(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_credentials;
  let $page, $$unsubscribe_page;
  $$unsubscribe_credentials = (0, import_index_7bf676ca.a)(import_stores_c1931941.c, (value) => value);
  $$unsubscribe_page = (0, import_index_7bf676ca.a)(import_stores_5517d273.p, (value) => $page = value);
  const code = $page.url.searchParams.get("code");
  const state = $page.url.searchParams.get("state");
  $$unsubscribe_credentials();
  $$unsubscribe_page();
  return `<h1>Estamos sincronizando con Mercado Libre....</h1>
<br><br>
<p>${(0, import_index_7bf676ca.e)(code)}</p>
<p>${(0, import_index_7bf676ca.e)(state)}</p>

${`${(0, import_index_7bf676ca.v)(import_Spinner_409a666b.S, "Spinner").$$render($$result, {}, {}, {})}`}`;
});
