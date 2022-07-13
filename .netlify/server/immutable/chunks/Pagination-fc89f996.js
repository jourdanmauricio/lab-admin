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
  P: () => Pagination
});
module.exports = __toCommonJS(stdin_exports);
var import_index_9af3cff5 = require("./index-9af3cff5.js");
const Pagination = (0, import_index_9af3cff5.c)(($$result, $$props, $$bindings, slots) => {
  let { pagination } = $$props;
  let { refreshData } = $$props;
  let page;
  let itemsxpage = pagination.limit;
  pagination.limit;
  const options = ["10", "30", "50", pagination.total];
  if (pagination.offset === 0) {
    page = 1;
  } else {
    page = pagination.offset / itemsxpage + 1;
  }
  let pages = Math.ceil(pagination.total / itemsxpage);
  if ($$props.pagination === void 0 && $$bindings.pagination && pagination !== void 0)
    $$bindings.pagination(pagination);
  if ($$props.refreshData === void 0 && $$bindings.refreshData && refreshData !== void 0)
    $$bindings.refreshData(refreshData);
  return `<div class="${"flex flex-col sm:flex-row items-center justify-between"}"><div class="${"mt-4"}"><label for="${"itemsxpage"}">Cant x p\xE1gina</label>
    <select class="${"ml-2 border border-solid border-black max-w-[80px]"}" name="${"itemsxpage"}" required="${"required"}">${(0, import_index_9af3cff5.b)(options, (option) => {
    return `<option${(0, import_index_9af3cff5.h)("value", option, 0)}>${(0, import_index_9af3cff5.e)(option)}</option>`;
  })}</select></div>
  <div class="${"mt-4"}"><button ${page === 1 ? "disabled" : ""} class="${"ml-10 font-bold hover:underline disabled:text-gray-500 disabled:font-normal"}" name="${"first"}">&lt; &lt;</button>
    <button ${page === 1 ? "disabled" : ""} class="${"ml-10 font-bold hover:underline disabled:text-gray-500 disabled:font-normal"}" name="${"prev"}">&lt;</button>
    <select ${pages === 1 ? "disabled" : ""} class="${"ml-10 border border-solid border-black max-w-[50px]"}" name="${"page"}" id="${"page"}" required="${"required"}">${(0, import_index_9af3cff5.b)(Array(pages), (_, index) => {
    return `<option ${index === page - 1 ? "selected" : ""}${(0, import_index_9af3cff5.h)("value", index + 1, 0)}>${(0, import_index_9af3cff5.e)(index + 1)}</option>`;
  })}</select>

    <button ${page === pages ? "disabled" : ""} class="${"ml-10 font-bold hover:underline disabled:text-gray-500 disabled:font-normal"}" name="${"next"}">&gt;</button>
    <button ${page === pages ? "disabled" : ""} class="${"ml-10 font-bold hover:underline disabled:text-gray-500 disabled:font-normal"}" name="${"last"}">&gt; &gt;</button></div></div>`;
});
