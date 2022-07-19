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
  default: () => Profile
});
module.exports = __toCommonJS(stdin_exports);
var import_index_7bf676ca = require("../../../immutable/chunks/index-7bf676ca.js");
var import_Api_a77dc7b1 = require("../../../immutable/chunks/Api-a77dc7b1.js");
var import_stores_c1931941 = require("../../../immutable/chunks/stores-c1931941.js");
var import_Modal2_6d227b9b = require("../../../immutable/chunks/Modal2-6d227b9b.js");
var import_axios = require("axios");
const Modal_change_Pass = (0, import_index_7bf676ca.c)(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_credentials;
  $$unsubscribe_credentials = (0, import_index_7bf676ca.a)(import_stores_c1931941.c, (value) => value);
  let modalChangePass;
  let errors = {};
  let oldPassword = "";
  let newPassword = "";
  let confirmPassword = "";
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<button class="${"btn ripple "}">Cambiar contrase\xF1a</button>

${(0, import_index_7bf676ca.v)(import_Modal2_6d227b9b.M, "Modal2").$$render($$result, { this: modalChangePass }, {
      this: ($$value) => {
        modalChangePass = $$value;
        $$settled = false;
      }
    }, {
      default: () => {
        return `<section class="${"flex flex-col justify-center"}"><h2 class="${"text-2xl"}">Cambiar contrase\xF1a</h2>
    <div class="${"py-4"}"><div class="${"w-full border-t border-gray-900"}"></div></div>
    <form><div><div class="${"relative mt-10"}"><input class="${"input-oval placeholder:tracking-normal"}" type="${"password"}" name="${"oldPassword"}" required="${"required"}" data-type="${"password"}" placeholder="${"Contrase\xF1a anterior"}"${(0, import_index_7bf676ca.i)("value", oldPassword, 0)}>
          ${errors.oldPassword ? `<p class="${"error"}"><small style="${"color: red"}">${(0, import_index_7bf676ca.e)(errors.oldPassword)}</small></p>` : ``}</div>
        <div class="${"relative mt-10"}"><input class="${"input-oval placeholder:tracking-normal"}" type="${"password"}" name="${"newPassword"}" required="${"required"}" placeholder="${"Nueva contrase\xF1a"}"${(0, import_index_7bf676ca.i)("value", newPassword, 0)}>
          ${errors.newPassword ? `<p class="${"error"}"><small style="${"color: red"}">${(0, import_index_7bf676ca.e)(errors.newPassword)}</small></p>` : ``}</div>
        <div class="${"relative mt-10"}"><input class="${"input-oval placeholder:tracking-normal"}" type="${"password"}" name="${"confirmPassword"}" required="${"required"}" placeholder="${"Confirmaci\xF3n contrase\xF1a"}"${(0, import_index_7bf676ca.i)("value", confirmPassword, 0)}>
          ${errors.confirmPassword ? `<p class="${"error"}"><small style="${"color: red"}">${(0, import_index_7bf676ca.e)(errors.confirmPassword)}</small></p>` : ``}</div>
        <div class="${"mt-10 flex justify-between"}"><button type="${"reset"}" class="${"ripple btn"}">Cancelar</button>
          <button class="${"btn ripple ml-10"}">Modificar</button></div></div></form>

    ${``}</section>`;
      }
    })}`;
  } while (!$$settled);
  $$unsubscribe_credentials();
  return $$rendered;
});
var index_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => "input.svelte-n3ul2v:-webkit-autofill,input.svelte-n3ul2v:-webkit-autofill:hover,input.svelte-n3ul2v:-webkit-autofill:focus{-webkit-transition:background-color 5000s ease-in-out 0s;transition:background-color 5000s ease-in-out 0s}")();
const css = {
  code: "input.svelte-n3ul2v:-webkit-autofill,input.svelte-n3ul2v:-webkit-autofill:hover,input.svelte-n3ul2v:-webkit-autofill:focus{-webkit-transition:background-color 5000s ease-in-out 0s;transition:background-color 5000s ease-in-out 0s}",
  map: null
};
const Profile = (0, import_index_7bf676ca.c)(($$result, $$props, $$bindings, slots) => {
  let $credentials, $$unsubscribe_credentials;
  $$unsubscribe_credentials = (0, import_index_7bf676ca.a)(import_stores_c1931941.c, (value) => $credentials = value);
  let errors = {};
  $$result.css.add(css);
  $$unsubscribe_credentials();
  return `<div class="${"flex flex-wrap justify-between gap-y-2"}"><h2 class="${"text-lg"}">${(0, import_index_7bf676ca.e)($credentials.email)}</h2>
  <button class="${"btn ripple btn-local"}">Eliminar cuenta</button>
  ${(0, import_index_7bf676ca.v)(Modal_change_Pass, "ModalChangePass").$$render($$result, {}, {}, {})}</div>

<form class="${"mt-10"}"><div class="${"grid grid-cols-2 gap-10"}"><div class="${"relative"}"><input class="${"input-oval svelte-n3ul2v"}" type="${"text"}" name="${"name"}"${(0, import_index_7bf676ca.i)("value", $credentials.customer ? $credentials.customer.name : "", 0)} required="${"required"}">
      <label class="${"label-oval"}" for="${"password"}">Nombre</label>
      ${errors.name ? `<p class="${"error"}"><small style="${"color: red"}">${(0, import_index_7bf676ca.e)(errors.name)}</small></p>` : ``}</div>
    <div class="${"relative"}"><input class="${"input-oval svelte-n3ul2v"}" type="${"text"}" name="${"lastName"}"${(0, import_index_7bf676ca.i)("value", $credentials.customer ? $credentials.customer.lastName : "", 0)} required="${"required"}">
      <label class="${"label-oval"}" for="${"password"}">Apellido</label>
      ${errors.lastName ? `<p class="${"error"}"><small style="${"color: red"}">${(0, import_index_7bf676ca.e)(errors.lastName)}</small></p>` : ``}</div>
    <div class="${"relative"}"><input class="${"input-oval svelte-n3ul2v"}" type="${"text"}" name="${"role"}"${(0, import_index_7bf676ca.i)("value", $credentials.role, 0)} readonly>
      <label class="${"label-oval"}" for="${"role"}">Role</label></div>
    <div class="${"relative"}"><input class="${"input-oval svelte-n3ul2v"}" type="${"text"}" name="${"phone"}"${(0, import_index_7bf676ca.i)("value", $credentials.customer ? $credentials.customer.phone : "", 0)} required="${"required"}">
      <label class="${"label-oval"}" for="${"phone"}">Tel\xE9fono</label>
      ${errors.phone ? `<p class="${"error"}"><small style="${"color: red"}">${(0, import_index_7bf676ca.e)(errors.phone)}</small></p>` : ``}</div>
    <div class="${"relative"}"><input class="${"input-oval svelte-n3ul2v"}" type="${"text"}" name="${"documentType"}"${(0, import_index_7bf676ca.i)("value", $credentials.customer ? $credentials.customer.documentType : "", 0)} required="${"required"}">
      <label class="${"label-oval"}" for="${"documentType"}">Tipo documento</label>
      ${errors.documentType ? `<p class="${"error"}"><small style="${"color: red"}">${(0, import_index_7bf676ca.e)(errors.documentType)}</small></p>` : ``}</div>
    <div class="${"relative"}"><input class="${"input-oval svelte-n3ul2v"}" type="${"text"}" name="${"documentNumber"}"${(0, import_index_7bf676ca.i)("value", $credentials.customer ? $credentials.customer.documentNumber : "", 0)} required="${"required"}">
      <label class="${"label-oval"}" for="${"documentNumber"}">N\xFAmero documento</label>
      ${errors.documentNumber ? `<p class="${"error"}"><small style="${"color: red"}">${(0, import_index_7bf676ca.e)(errors.documentNumber)}</small></p>` : ``}</div></div>

  <div class="${"text-right"}"><button type="${"submit"}" class="${"btn mt-8 py-1 px-10 ripple"}">Enviar</button></div></form>

${``}`;
});
