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
  F: () => Footer,
  S: () => Snackbar
});
module.exports = __toCommonJS(stdin_exports);
var import_index_7bf676ca = require("./index-7bf676ca.js");
var import_stores_c1931941 = require("./stores-c1931941.js");
const Footer = (0, import_index_7bf676ca.c)(($$result, $$props, $$bindings, slots) => {
  return `<footer class="${"bg-gray-900 p-1 text-white"}">Copyright \xA9 2022 TiDev. All rights reserved.
</footer>`;
});
var Snackbar_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".snackbar.svelte-1h4ah5m{visibility:hidden;min-width:250px;margin-left:-125px;background-color:#333;color:#fff;text-align:center;border-radius:4px;padding:16px;position:fixed;z-index:1;right:1%;top:50px;font-size:17px}.error.svelte-1h4ah5m{background-color:red}.success.svelte-1h4ah5m{background-color:green}.info.svelte-1h4ah5m{background-color:#333}.snackbar.show.svelte-1h4ah5m{visibility:visible;-webkit-animation:svelte-1h4ah5m-fadein 0.5s, svelte-1h4ah5m-fadeout 0.5s 2.5s;animation:svelte-1h4ah5m-fadein 0.5s, svelte-1h4ah5m-fadeout 0.5s 2.5s}@-webkit-keyframes svelte-1h4ah5m-fadein{from{top:0;opacity:0}to{top:50px;opacity:1}}@keyframes svelte-1h4ah5m-fadein{from{top:0;opacity:0}to{top:50px;opacity:1}}@-webkit-keyframes svelte-1h4ah5m-fadeout{from{top:50px;opacity:1}to{top:0;opacity:0}}@keyframes svelte-1h4ah5m-fadeout{from{top:50px;opacity:1}to{top:0;opacity:0}}")();
const css = {
  code: ".snackbar.svelte-1h4ah5m{visibility:hidden;min-width:250px;margin-left:-125px;background-color:#333;color:#fff;text-align:center;border-radius:4px;padding:16px;position:fixed;z-index:1;right:1%;top:50px;font-size:17px}.error.svelte-1h4ah5m{background-color:red}.success.svelte-1h4ah5m{background-color:green}.info.svelte-1h4ah5m{background-color:#333}.snackbar.show.svelte-1h4ah5m{visibility:visible;-webkit-animation:svelte-1h4ah5m-fadein 0.5s, svelte-1h4ah5m-fadeout 0.5s 2.5s;animation:svelte-1h4ah5m-fadein 0.5s, svelte-1h4ah5m-fadeout 0.5s 2.5s}@-webkit-keyframes svelte-1h4ah5m-fadein{from{top:0;opacity:0}to{top:50px;opacity:1}}@keyframes svelte-1h4ah5m-fadein{from{top:0;opacity:0}to{top:50px;opacity:1}}@-webkit-keyframes svelte-1h4ah5m-fadeout{from{top:50px;opacity:1}to{top:0;opacity:0}}@keyframes svelte-1h4ah5m-fadeout{from{top:50px;opacity:1}to{top:0;opacity:0}}",
  map: null
};
const Snackbar = (0, import_index_7bf676ca.c)(($$result, $$props, $$bindings, slots) => {
  let $notification, $$unsubscribe_notification;
  $$unsubscribe_notification = (0, import_index_7bf676ca.a)(import_stores_c1931941.n, (value) => $notification = value);
  function handleType() {
    let classes = `snackbar ${$notification.type} `;
    if ($notification.show)
      classes += "show ";
    return classes;
  }
  $$result.css.add(css);
  $$unsubscribe_notification();
  return `${$notification.show ? `<div class="${(0, import_index_7bf676ca.e)((0, import_index_7bf676ca.f)(handleType())) + " svelte-1h4ah5m"}">${(0, import_index_7bf676ca.e)($notification.message)}</div>` : ``}`;
});
