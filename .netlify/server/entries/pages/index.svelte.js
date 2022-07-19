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
  default: () => Routes
});
module.exports = __toCommonJS(stdin_exports);
var import_index_7bf676ca = require("../../immutable/chunks/index-7bf676ca.js");
var import_Api_a77dc7b1 = require("../../immutable/chunks/Api-a77dc7b1.js");
var import_ApiMl_f5c181ef = require("../../immutable/chunks/ApiMl-f5c181ef.js");
var import_Snackbar_7f929ea8 = require("../../immutable/chunks/Snackbar-7f929ea8.js");
var import_axios = require("axios");
var import_stores_c1931941 = require("../../immutable/chunks/stores-c1931941.js");
const Nav_home = (0, import_index_7bf676ca.c)(($$result, $$props, $$bindings, slots) => {
  let showMenu = "hidden";
  return `<nav class="${"bg-gray-900 shadow-md"}"><div class="${"max-w-6xl mx-auto px-2 sm:px-6 lg:px-8"}"><div class="${"relative flex items-center justify-between h-16"}"><div class="${"absolute left-0 inset-y-0 right-0 flex items-center sm:hidden"}">
        
        <button type="${"button"}" class="${"inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"}" aria-controls="${"mobile-menu"}" aria-expanded="${"false"}"><span class="${"sr-only"}">Open main menu</span>
          
          <svg class="${"block h-6 w-6"}" xmlns="${"http://www.w3.org/2000/svg"}" fill="${"none"}" viewBox="${"0 0 24 24"}" stroke-width="${"2"}" stroke="${"currentColor"}" aria-hidden="${"true"}"><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" d="${"M4 6h16M4 12h16M4 18h16"}"></path></svg>
          
          <svg class="${"hidden h-6 w-6"}" xmlns="${"http://www.w3.org/2000/svg"}" fill="${"none"}" viewBox="${"0 0 24 24"}" stroke-width="${"2"}" stroke="${"currentColor"}" aria-hidden="${"true"}"><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" d="${"M6 18L18 6M6 6l12 12"}"></path></svg></button></div>
      
      
      <div class="${"flex-1 flex items-center justify-center sm:items-stretch sm:justify-between"}">
        <div class="${"flex-shrink-0 flex items-center"}">
          <img class="${"lg:block h-8 w-auto"}" src="${"https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"}" alt="${"Workflow"}"></div>
        
        
        
        <div class="${"hidden sm:block sm:ml-6"}"><div class="${"flex space-x-4"}">
            <a href="${"#inicio"}" class="${"bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"}" aria-current="${"page"}">Inicio</a>

            <a href="${"#contacto"}" class="${"text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"}">Contacto</a>

            <a href="${"#login"}" class="${"text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"}">Login</a></div></div></div>
      </div></div>

  
  <div class="${(0, import_index_7bf676ca.e)(showMenu) + " sm:hidden"}" id="${"mobile-menu"}"><div class="${"px-2 pt-2 pb-3 space-y-1"}">
      <a href="${"#inicio"}" class="${"bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"}" aria-current="${"page"}">Inicio</a>
      <a href="${"#contacto"}" class="${"text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"}">Contacto</a>

      <a href="${"#login"}" class="${"text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"}">Login</a></div></div></nav>`;
});
var index_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => "input.svelte-l9e4of:-webkit-autofill,input.svelte-l9e4of:-webkit-autofill:hover,input.svelte-l9e4of:-webkit-autofill:focus{-webkit-text-fill-color:white;-webkit-transition:background-color 5000s ease-in-out 0s;transition:background-color 5000s ease-in-out 0s;caret-color:white}")();
const css = {
  code: "input.svelte-l9e4of:-webkit-autofill,input.svelte-l9e4of:-webkit-autofill:hover,input.svelte-l9e4of:-webkit-autofill:focus{-webkit-text-fill-color:white;-webkit-transition:background-color 5000s ease-in-out 0s;transition:background-color 5000s ease-in-out 0s;caret-color:white}",
  map: null
};
const Routes = (0, import_index_7bf676ca.c)(($$result, $$props, $$bindings, slots) => {
  let errors = {};
  let email = "admin@integriprod.com";
  let password = "integriprod";
  $$result.css.add(css);
  return `${(0, import_index_7bf676ca.v)(Nav_home, "NavHome").$$render($$result, {}, {}, {})}
${(0, import_index_7bf676ca.v)(import_Snackbar_7f929ea8.S, "Snackbar").$$render($$result, {}, {}, {})}

${``}

<div class="${"mt-10"}" id="${"login"}"><div class="${"ml-auto mr-auto text-center w-2/4 min-w-280 max-w-550 p-10 bg-gray-900 box-border shadow-3xl rounded-lg"}"><h2 class="${"text-center text-3xl p-0 text-white"}">Login</h2>

    <form><div class="${"relative mt-16"}"><input class="${"input-oval text-white valid:border-white focus:border-white invalid:border-white svelte-l9e4of"}" type="${"text"}" name="${"email"}" required="${"required"}"${(0, import_index_7bf676ca.i)("value", email, 0)}>
        <label class="${"label-oval text-white"}" for="${"email"}">Email</label>
        ${errors.email ? `<p class="${"error"}"><small style="${"color: red"}">${(0, import_index_7bf676ca.e)(errors.email)}</small></p>` : ``}</div>
      <div class="${"relative mt-16"}"><input class="${"input-oval text-white valid:border-white focus:border-white invalid:border-white svelte-l9e4of"}" type="${"password"}" name="${"password"}" required="${"required"}"${(0, import_index_7bf676ca.i)("value", password, 0)}>
        <label class="${"label-oval text-white"}" for="${"password"}">Password</label>
        ${errors.password ? `<p class="${"error"}"><small style="${"color: red"}">${(0, import_index_7bf676ca.e)(errors.password)}</small></p>` : ``}</div>

      <p class="${"text-right text-white cursor-pointer mt-8"}"><a class="${""}" href="${"/forgot-password"}">\xBFOlvid\xF3 su contrase\xF1a?</a></p>

      <button type="${"submit"}" class="${"mt-10 btn ripple"}">Login</button></form></div></div>

<div class="${"h-screen"}" id="${"inicio"}"><h2>Inicio</h2></div>

<div class="${"h-screen"}" id="${"contacto"}"><h2>Contacto</h2></div>

${(0, import_index_7bf676ca.v)(import_Snackbar_7f929ea8.F, "Footer").$$render($$result, {}, {}, {})}`;
});
