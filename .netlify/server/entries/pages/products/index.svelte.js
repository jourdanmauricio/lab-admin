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
  default: () => Products
});
module.exports = __toCommonJS(stdin_exports);
var import_index_7bf676ca = require("../../../immutable/chunks/index-7bf676ca.js");
var import_Api_a77dc7b1 = require("../../../immutable/chunks/Api-a77dc7b1.js");
var import_axios = require("axios");
var import_stores_c1931941 = require("../../../immutable/chunks/stores-c1931941.js");
var import_ApiMl_f5c181ef = require("../../../immutable/chunks/ApiMl-f5c181ef.js");
var import_Modal2_6d227b9b = require("../../../immutable/chunks/Modal2-6d227b9b.js");
var import_Pagination_f071ff98 = require("../../../immutable/chunks/Pagination-f071ff98.js");
const getProducts = async (limit, offset, search) => {
  try {
    let paramSearch = !search ? "" : `&q=${search}`;
    const products = await import_Api_a77dc7b1.A.get(`/products?limit=${limit}&offset=${offset}${paramSearch}`);
    return products;
  } catch (error) {
    throw error;
  }
};
const ModalDelProd = (0, import_index_7bf676ca.c)(($$result, $$props, $$bindings, slots) => {
  let { currentProd } = $$props;
  let { hide } = $$props;
  if ($$props.currentProd === void 0 && $$bindings.currentProd && currentProd !== void 0)
    $$bindings.currentProd(currentProd);
  if ($$props.hide === void 0 && $$bindings.hide && hide !== void 0)
    $$bindings.hide(hide);
  return `<h2 class="${"text-xl text-center"}">Eliminar producto - ${(0, import_index_7bf676ca.e)(currentProd.name)}</h2>
<div class="${"py-4"}"><div class="${"w-full border-t border-gray-900"}"></div></div>

<p class="${"mt-5 min-w-[350px]"}">Est\xE1 seguro de eliminar el producto?</p>

<div class="${"mt-10 flex justify-between"}"><button class="${"ripple rounded bg-red-900 text-white py-1 px-10 "}">Eliminar</button>
  <button class="${"ripple btn"}">Cancelar</button></div>`;
});
const Products = (0, import_index_7bf676ca.c)(($$result, $$props, $$bindings, slots) => {
  let $settings, $$unsubscribe_settings;
  $$unsubscribe_settings = (0, import_index_7bf676ca.a)(import_stores_c1931941.s, (value) => $settings = value);
  let modalDelete;
  let products = [];
  let search = null;
  let pagination = { limit: $settings.itemsxpage, offset: 0 };
  let currentProd = null;
  function hide(reload) {
    console.log("reaload: ", reload);
    if (reload)
      loadData();
    modalDelete.hide();
  }
  function refreshData(pag) {
    pagination = pag;
    loadData();
  }
  async function loadData() {
    try {
      import_stores_c1931941.l.show(true);
      const data = await getProducts(pagination.limit, pagination.offset, search);
      products = data.results;
      console.log("Products", products);
      pagination = {
        limit: data.paging.limit,
        offset: data.paging.offset,
        total: data.paging.total,
        results: data.results.length
      };
    } catch (error) {
      import_stores_c1931941.n.show(error, "error");
    } finally {
      import_stores_c1931941.l.show(false);
    }
  }
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<caption class="${"flex pl-0 justify-between mt-1 flex-col sm:flex-row bg-secondaryColor text-white min-w-[320px] border px-10 py-1 border-gray-900"}"><div class="${"flex items-center"}"><div><button class="${"inline-flex items-center p-2 text-sm font-medium text-center rounded-full hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-700 dark:focus:ring-gray-600"}" type="${"button"}"><i class="${"material-icons"}" aria-hidden="${"true"}">more_vert</i></button>
      
      ${``}</div>

    <span class="${"text-lg ml-5"}">Productos: ${(0, import_index_7bf676ca.e)(pagination.total)}</span></div>
  <div class="${"flex items-center"}"><input class="${"text-black w-[250px] pl-1"}" name="${"search"}" type="${"search"}"${(0, import_index_7bf676ca.i)("value", search, 0)}></div>
  </caption>

<table id="${"tblData"}" class="${"responsive-table"}"><thead><tr><th>ID</th>
      <th>Imagen</th>
      <th>ML ID</th>
      <th>Estado</th>
      <th>Precio</th>
      <th>Producto</th>
      <th>Informaci\xF3n</th>
      <th>Acciones</th></tr></thead>
  <tbody>${(0, import_index_7bf676ca.b)(products, (product) => {
      return `<tr><td>${(0, import_index_7bf676ca.e)(product.id)}</td>
        <td><img${(0, import_index_7bf676ca.i)("src", product.thumbnail, 0)} alt="${""}"></td>
        <td>${(0, import_index_7bf676ca.e)(product.prodMl.id)}</td>
        <td>${(0, import_index_7bf676ca.e)(product.prodMl.status)}</td>
        <td>${(0, import_index_7bf676ca.e)(product.price)}</td>
        <td>${(0, import_index_7bf676ca.e)(product.name)}</td>
        <td><img src="${"./../statics/logos/ML.webp"}" alt="${""}"></td>
        <td><button${(0, import_index_7bf676ca.i)("id", product.id, 0)}><i class="${"material-icons"}" style="${"color: red"}">delete</i></button></td>
      </tr>`;
    })}</tbody></table>

${pagination.total ? `${(0, import_index_7bf676ca.v)(import_Pagination_f071ff98.P, "Pagination").$$render($$result, { refreshData, pagination }, {}, {})}` : ``}

${(0, import_index_7bf676ca.v)(import_Modal2_6d227b9b.M, "Modal2").$$render($$result, { this: modalDelete }, {
      this: ($$value) => {
        modalDelete = $$value;
        $$settled = false;
      }
    }, {
      default: () => {
        return `${(0, import_index_7bf676ca.v)(ModalDelProd, "ModalDelProd").$$render($$result, { currentProd, hide }, {}, {})}`;
      }
    })}`;
  } while (!$$settled);
  $$unsubscribe_settings();
  return $$rendered;
});
