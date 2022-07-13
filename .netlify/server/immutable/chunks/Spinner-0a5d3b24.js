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
  S: () => Spinner
});
module.exports = __toCommonJS(stdin_exports);
var import_index_9af3cff5 = require("./index-9af3cff5.js");
const css = {
  code: "@-webkit-keyframes svelte-2ci31y-spinner{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@keyframes svelte-2ci31y-spinner{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}.spinner.svelte-2ci31y{position:fixed;top:40%;left:47%;width:5vw;height:5vw;margin-left:auto;margin-right:auto;border:0.5vw solid rgba(0, 0, 0, 0.1);border-top-color:#09f;border-radius:50%;-webkit-animation:svelte-2ci31y-spinner 1s ease-out infinite;animation:svelte-2ci31y-spinner 1s ease-out infinite}.overlay.svelte-2ci31y{position:absolute;top:0;left:0;right:0;bottom:0;background-color:rgba(0, 0, 0, 0.6);background:url(data:;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuNUmK/OAAAAATSURBVBhXY2RgYNgHxGAAYuwDAA78AjwwRoQYAAAAAElFTkSuQmCC)\n      repeat scroll transparent\\9;z-index:9999;color:white}",
  map: null
};
const Spinner = (0, import_index_9af3cff5.c)(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="${"overlay svelte-2ci31y"}"><div class="${"spinner svelte-2ci31y"}"></div>
</div>`;
});
