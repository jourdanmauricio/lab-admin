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
  default: () => _layout_root_default
});
module.exports = __toCommonJS(stdin_exports);
var import_index_7bf676ca = require("../../immutable/chunks/index-7bf676ca.js");
var import_Spinner_409a666b = require("../../immutable/chunks/Spinner-409a666b.js");
var import_ApiMl_f5c181ef = require("../../immutable/chunks/ApiMl-f5c181ef.js");
var import_Api_a77dc7b1 = require("../../immutable/chunks/Api-a77dc7b1.js");
var import_stores_c1931941 = require("../../immutable/chunks/stores-c1931941.js");
var import_Snackbar_7f929ea8 = require("../../immutable/chunks/Snackbar-7f929ea8.js");
var import_stores_5517d273 = require("../../immutable/chunks/stores-5517d273.js");
var import_axios = require("axios");
const Nav_dashboard = (0, import_index_7bf676ca.c)(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = (0, import_index_7bf676ca.a)(import_stores_5517d273.p, (value) => $page = value);
  let { fullDisplay } = $$props;
  const nav = [
    {
      title: "<i class='material-icons' style='color: yellow;'>notifications</i>",
      path: "/about"
    }
  ];
  if ($$props.fullDisplay === void 0 && $$bindings.fullDisplay && fullDisplay !== void 0)
    $$bindings.fullDisplay(fullDisplay);
  $page.url.pathname;
  $$unsubscribe_page();
  return `<nav class="${"bg-gray-900 h-12 pl-5 flex items-center justify-between shadow-[0_2px_10px_2px_rgba(0,0,0,0.9)]"}"><div><input type="${"checkbox"}" class="${"hidden"}" id="${"check"}">
    <label for="${"check"}" class="${"text-3xl text-white cursor-pointer"}"><i class="${"material-icons"}">menu</i></label>

    <a href="${"/dashboard"}" class="${"enlace"}">
      <span class="${"text-white px-10 py-0 hidden sm:inline text-sm sm:text-3xl"}">Integriprod</span></a></div>

  <ul class="${"flex"}">${(0, import_index_7bf676ca.b)(nav, (item) => {
    return `<li><a class="${["mr-4", $page.url.pathname === "/about" ? "active" : ""].join(" ").trim()}" href="${"/about"}"><!-- HTML_TAG_START -->${item.title}<!-- HTML_TAG_END --></a>
      </li>`;
  })}
    <li><i class="${"mr-4 material-icons cursor-pointer text-yellow-500 active:text-gray-400"}">help_center</i></li>
    <li><button class="${"mr-4"}"><i class="${"material-icons"}" style="${"color: red;"}">logout</i></button></li></ul></nav>`;
});
const Sidebar_dashboard = (0, import_index_7bf676ca.c)(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  let $credentials, $$unsubscribe_credentials;
  $$unsubscribe_page = (0, import_index_7bf676ca.a)(import_stores_5517d273.p, (value) => $page = value);
  $$unsubscribe_credentials = (0, import_index_7bf676ca.a)(import_stores_c1931941.c, (value) => $credentials = value);
  $$unsubscribe_page();
  $$unsubscribe_credentials();
  return `

<nav class="${"bg-gray-900 h-full"}"><ul class="${"-white flex flex-col"}"><li class="${"mt-4"}"><a class="${"flex rounded text-white py-1 pl-5 bg-transparent hover:bg-secondaryColor " + (0, import_index_7bf676ca.e)($page.url.pathname === "/dashboard" ? "bg-secondaryColor" : "transparent")}" href="${"/dashboard"}"><i class="${"material-icons"}">dashboard</i><span class="${"ml-2"}">Dashboard</span></a></li>
    <li class="${"mt-4"}"><a class="${"flex rounded text-white py-1 pl-5 bg-transparent hover:bg-secondaryColor " + (0, import_index_7bf676ca.e)($page.url.pathname === "/profile" ? "bg-secondaryColor" : "transparent")}" href="${"/profile"}"><i class="${"material-icons"}">person</i><span class="${"ml-2"}">Perfil</span></a></li>
    <li class="${"mt-4"}"><a class="${"flex rounded text-white py-1 pl-5 bg-transparent hover:bg-secondaryColor " + (0, import_index_7bf676ca.e)($page.url.pathname === "/settings" ? "bg-secondaryColor" : "transparent")}" href="${"/settings"}"><i class="${"material-icons text-gray-500"}">settings</i><span class="${"ml-2"}">Configuraci\xF3n</span></a></li>
    <li class="${"mt-4"}"><a class="${"flex rounded text-white py-1 pl-5 bg-transparent hover:bg-secondaryColor " + (0, import_index_7bf676ca.e)($page.url.pathname === "/products" ? "bg-secondaryColor" : "transparent")}" href="${"/products"}"><i class="${"material-icons"}" style="${"color: teal;"}">stars</i><span class="${"ml-2"}">Productos</span></a></li>
    ${$credentials.role === "superadmin" ? `<li class="${"mt-4 "}"><a class="${"flex rounded text-white py-1 pl-5 bg-transparent hover:bg-secondaryColor " + (0, import_index_7bf676ca.e)($page.url.pathname === "/users" ? "bg-secondaryColor" : "transparent")}" href="${"/users"}"><i class="${"material-icons"}">group</i><span class="${"ml-2"}">Usuarios</span></a></li>` : ``}</ul></nav>`;
});
var __layoutRoot_default_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => '.g-content.svelte-180izbq.svelte-180izbq{background-color:azure;display:grid;height:100vh;grid-template-columns:180px minmax(0, 1fr);grid-template-rows:45px 1fr 30px;grid-template-areas:"g-header g-header"\n      "g-side g-main"\n      "g-footer g-footer";overflow-x:hidden}.g-header.svelte-180izbq.svelte-180izbq{grid-area:g-header}.g-side.svelte-180izbq.svelte-180izbq{grid-area:g-side;transition:all 0.5s}.g-main.svelte-180izbq.svelte-180izbq{grid-area:g-main;transition:all 0.5s;padding:20px}.g-footer.svelte-180izbq.svelte-180izbq{grid-area:g-footer}.animate.svelte-180izbq .g-main.svelte-180izbq{width:calc(100% + 180px);transform:translateX(-180px)}.animate.svelte-180izbq .g-side.svelte-180izbq{transform:translateX(-180px)}')();
const css = {
  code: '.g-content.svelte-180izbq.svelte-180izbq{background-color:azure;display:grid;height:100vh;grid-template-columns:180px minmax(0, 1fr);grid-template-rows:45px 1fr 30px;grid-template-areas:"g-header g-header"\n      "g-side g-main"\n      "g-footer g-footer";overflow-x:hidden}.g-header.svelte-180izbq.svelte-180izbq{grid-area:g-header}.g-side.svelte-180izbq.svelte-180izbq{grid-area:g-side;transition:all 0.5s}.g-main.svelte-180izbq.svelte-180izbq{grid-area:g-main;transition:all 0.5s;padding:20px}.g-footer.svelte-180izbq.svelte-180izbq{grid-area:g-footer}.animate.svelte-180izbq .g-main.svelte-180izbq{width:calc(100% + 180px);transform:translateX(-180px)}.animate.svelte-180izbq .g-side.svelte-180izbq{transform:translateX(-180px)}',
  map: null
};
const _layout_root_default = (0, import_index_7bf676ca.c)(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_isLogged;
  let $loading, $$unsubscribe_loading;
  $$unsubscribe_isLogged = (0, import_index_7bf676ca.a)(import_stores_c1931941.i, (value) => value);
  $$unsubscribe_loading = (0, import_index_7bf676ca.a)(import_stores_c1931941.l, (value) => $loading = value);
  let fullWidth = false;
  const fullDisplay = () => fullWidth = !fullWidth;
  $$result.css.add(css);
  $$unsubscribe_isLogged();
  $$unsubscribe_loading();
  return `${(0, import_index_7bf676ca.v)(import_Snackbar_7f929ea8.S, "Snackbar").$$render($$result, { class: "z-10" }, {}, {})}

${$loading ? `${(0, import_index_7bf676ca.v)(import_Spinner_409a666b.S, "Spinner").$$render($$result, {}, {}, {})}` : ``}

<div class="${"g-content " + (0, import_index_7bf676ca.e)(fullWidth ? "animate" : "") + " svelte-180izbq"}"><div class="${"g-header svelte-180izbq"}">${(0, import_index_7bf676ca.v)(Nav_dashboard, "NavDashboard").$$render($$result, { fullDisplay }, {}, {})}</div>

  <div class="${"g-side svelte-180izbq"}">${(0, import_index_7bf676ca.v)(Sidebar_dashboard, "SidebarDashboard").$$render($$result, {}, {}, {})}</div>

  <div class="${"g-main svelte-180izbq"}">${slots.default ? slots.default({}) : ``}</div>

  <div class="${"g-footer svelte-180izbq"}">${(0, import_index_7bf676ca.v)(import_Snackbar_7f929ea8.F, "Footer").$$render($$result, {}, {}, {})}</div>
</div>`;
});
