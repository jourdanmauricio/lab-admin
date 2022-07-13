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
  M: () => Modal2
});
module.exports = __toCommonJS(stdin_exports);
var import_index_9af3cff5 = require("./index-9af3cff5.js");
const Modal2 = (0, import_index_9af3cff5.c)(($$result, $$props, $$bindings, slots) => {
  let shown = false;
  function show() {
    shown = true;
  }
  function hide() {
    shown = false;
  }
  if ($$props.show === void 0 && $$bindings.show && show !== void 0)
    $$bindings.show(show);
  if ($$props.hide === void 0 && $$bindings.hide && hide !== void 0)
    $$bindings.hide(hide);
  return `

${shown ? `<div class="${"w-screen h-full fixed top-0 left-0 flex justify-center items-start bg-gray-900 opacity-90 z-10"}"><div class="${"bg-gray-200 text-black rounded-md px-8 py-10 relative opacity-95"}"><span class="${"absolute top-2 right-4 text-4xl cursor-pointer text-gray-900 hover:-translate-y-0.5 transition-transform"}">\xD7</span>
      ${slots.default ? slots.default({}) : ``}</div></div>` : ``}`;
});
