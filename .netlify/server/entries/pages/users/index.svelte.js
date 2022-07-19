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
  default: () => Users
});
module.exports = __toCommonJS(stdin_exports);
var import_index_7bf676ca = require("../../../immutable/chunks/index-7bf676ca.js");
var import_Pagination_f071ff98 = require("../../../immutable/chunks/Pagination-f071ff98.js");
var import_Modal2_6d227b9b = require("../../../immutable/chunks/Modal2-6d227b9b.js");
var import_Spinner_409a666b = require("../../../immutable/chunks/Spinner-409a666b.js");
var import_stores_c1931941 = require("../../../immutable/chunks/stores-c1931941.js");
var index_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => '@media only screen and (max-width: 1024px){td.svelte-jjp6dp:nth-of-type(1):before{content:"Id"}td.svelte-jjp6dp:nth-of-type(2):before{content:"Email"}td.svelte-jjp6dp:nth-of-type(3):before{content:"Nombre"}td.svelte-jjp6dp:nth-of-type(4):before{content:"Apellido"}td.svelte-jjp6dp:nth-of-type(5):before{content:"Role"}td.svelte-jjp6dp:nth-of-type(6):before{content:"Tel\xE9fono";content:"Documento"}td.svelte-jjp6dp:nth-of-type(7):before{content:"Acciones"}input.svelte-jjp6dp:-webkit-autofill,input.svelte-jjp6dp:-webkit-autofill:hover,input.svelte-jjp6dp:-webkit-autofill:focus{-webkit-transition:background-color 5000s ease-in-out 0s;transition:background-color 5000s ease-in-out 0s}}')();
const css = {
  code: '@media only screen and (max-width: 1024px){td.svelte-jjp6dp:nth-of-type(1):before{content:"Id"}td.svelte-jjp6dp:nth-of-type(2):before{content:"Email"}td.svelte-jjp6dp:nth-of-type(3):before{content:"Nombre"}td.svelte-jjp6dp:nth-of-type(4):before{content:"Apellido"}td.svelte-jjp6dp:nth-of-type(5):before{content:"Role"}td.svelte-jjp6dp:nth-of-type(6):before{content:"Tel\xE9fono";content:"Documento"}td.svelte-jjp6dp:nth-of-type(7):before{content:"Acciones"}input.svelte-jjp6dp:-webkit-autofill,input.svelte-jjp6dp:-webkit-autofill:hover,input.svelte-jjp6dp:-webkit-autofill:focus{-webkit-transition:background-color 5000s ease-in-out 0s;transition:background-color 5000s ease-in-out 0s}}',
  map: null
};
const Users = (0, import_index_7bf676ca.c)(($$result, $$props, $$bindings, slots) => {
  let $settings, $$unsubscribe_settings;
  let $credentials, $$unsubscribe_credentials;
  $$unsubscribe_settings = (0, import_index_7bf676ca.a)(import_stores_c1931941.s, (value) => $settings = value);
  $$unsubscribe_credentials = (0, import_index_7bf676ca.a)(import_stores_c1931941.c, (value) => $credentials = value);
  let modalDelete;
  let modalCreate;
  let isLoading = false;
  let users = [];
  let search = null;
  let pagination = { limit: $settings.itemsxpage, offset: 0 };
  let errors = {};
  let currentUser = null;
  function refreshData(pag) {
    pagination = pag;
    loadData();
  }
  async function loadData() {
    try {
      isLoading = true;
      let url = `${import_stores_c1931941.v.basePath}/users?limit=${pagination.limit}&offset=${pagination.offset}`;
      if (search)
        ;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${$credentials.token}`
        }
      });
      let data = await response.json();
      console.log("data", data);
      users = data.results;
      pagination = {
        limit: data.paging.limit,
        offset: data.paging.offset,
        total: data.paging.total,
        results: data.results.length
      };
    } catch (error) {
      import_stores_c1931941.n.show(error, "error");
      console.error(`Error in load function for /: ${error}`);
    } finally {
      isLoading = false;
    }
  }
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${isLoading ? `${(0, import_index_7bf676ca.v)(import_Spinner_409a666b.S, "Spinner").$$render($$result, {}, {}, {})}` : ``}

${!$credentials.role ? `` : `${$credentials.role !== "superadmin" ? `<h1>Acceso no autorizado</h1>` : `<caption class="${"flex items-center justify-between flex-col sm:flex-row bg-secondaryColor text-white min-w-[320px] border px-10 py-1 border-gray-900 "}"><div class="${"flex"}"><i class="${"material-icons text-green-700 active:text-gray-300 cursor-pointer"}">file_download</i>
      <span class="${"text-lg ml-1"}">Usuarios: ${(0, import_index_7bf676ca.e)(pagination.total)}</span></div>
    <div class="${"flex items-center"}"><input class="${"text-black w-[250px] pl-1 svelte-jjp6dp"}" name="${"search"}" type="${"search"}"${(0, import_index_7bf676ca.i)("value", search, 0)}>
      </div>
    <button><i class="${"material-icons mt-1 text-teal-700"}">add_circle</i></button></caption>

  <table id="${"tblData"}" class="${"responsive-table"}"><thead><tr><th>Id</th>
        <th>Email</th>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Role</th>
        <th>Tel\xE9fono</th>
        <th>Documento</th>
        <th>Acciones</th></tr></thead>
    <tbody>${(0, import_index_7bf676ca.b)(users, (user) => {
      return `<tr><td class="${"svelte-jjp6dp"}">${(0, import_index_7bf676ca.e)(user.id)}</td>
          <td class="${"svelte-jjp6dp"}">${(0, import_index_7bf676ca.e)(user.email)}</td>
          <td class="${"svelte-jjp6dp"}">${(0, import_index_7bf676ca.e)(user.customer ? user.customer.name : "")}</td>
          <td class="${"svelte-jjp6dp"}">${(0, import_index_7bf676ca.e)(user.customer ? user.customer.lastName : "")}</td>
          <td class="${"svelte-jjp6dp"}">${(0, import_index_7bf676ca.e)(user.role)}</td>
          <td class="${"svelte-jjp6dp"}">${(0, import_index_7bf676ca.e)(user.customer ? user.customer.phone : "")}</td>
          <td class="${"svelte-jjp6dp"}">${(0, import_index_7bf676ca.e)(user.customer ? user.customer.documentNumber : "")}</td>
          <td class="${"svelte-jjp6dp"}"><button${(0, import_index_7bf676ca.i)("id", user.id, 0)}><i class="${"material-icons"}" style="${"color: red"}">delete</i></button></td>
        </tr>`;
    })}</tbody></table>
  ${pagination.total ? `${(0, import_index_7bf676ca.v)(import_Pagination_f071ff98.P, "Pagination").$$render($$result, { refreshData, pagination }, {}, {})}` : ``}`}`}

${(0, import_index_7bf676ca.v)(import_Modal2_6d227b9b.M, "Modal2").$$render($$result, { this: modalDelete }, {
      this: ($$value) => {
        modalDelete = $$value;
        $$settled = false;
      }
    }, {
      default: () => {
        return `<h2 class="${"text-2xl text-center"}">Eliminar usuario ${(0, import_index_7bf676ca.e)(currentUser.customer ? currentUser.customer.name : "")}
    ${(0, import_index_7bf676ca.e)(currentUser.customer ? currentUser.customer.lastName : "")}</h2>
  <div class="${"py-4"}"><div class="${"w-full border-t border-gray-900"}"></div></div>

  <p class="${"mt-5 min-w-[350px]"}">Est\xE1 seguro de eliminar el usuario?</p>
  <p>${(0, import_index_7bf676ca.e)(currentUser.email)}</p>
  <p>Role: ${(0, import_index_7bf676ca.e)(currentUser.role)}</p>

  <div class="${"mt-10 flex justify-between"}"><button class="${"ripple rounded bg-red-900 text-white py-1 px-10 "}">Eliminar</button>
    <button class="${"ripple btn"}">Cancelar</button></div>`;
      }
    })}

${(0, import_index_7bf676ca.v)(import_Modal2_6d227b9b.M, "Modal2").$$render($$result, { this: modalCreate }, {
      this: ($$value) => {
        modalCreate = $$value;
        $$settled = false;
      }
    }, {
      default: () => {
        return `<div class="${"w-[50vw] min-w-fit"}"><h2 class="${"text-2xl text-center"}">Crear usuario</h2>
    <div class="${"py-4"}"><div class="${"w-full border-t border-gray-900"}"></div></div>
    <form><div class="${"relative mt-10"}"><input class="${"input-oval min-w-[250px] svelte-jjp6dp"}" type="${"email"}" name="${"email"}" required="${"required"}">
        <label class="${"label-oval"}" for="${"email"}">Email</label>
        ${errors.email ? `<p class="${"error"}"><small style="${"color: red"}">${(0, import_index_7bf676ca.e)(errors.email)}</small></p>` : ``}</div>
      <div class="${"relative mt-10"}"><input class="${"input-oval svelte-jjp6dp"}" type="${"password"}" name="${"password"}" required="${"required"}">
        <label class="${"label-oval"}" for="${"password"}">Password</label>
        ${errors.password ? `<p class="${"error"}"><small style="${"color: red"}">${(0, import_index_7bf676ca.e)(errors.password)}</small></p>` : ``}</div>
      <div class="${"relative mt-10"}"><select class="${"input-oval"}" name="${"role"}" id="${"role"}"><option value="${"admin"}">Admin</option><option value="${"customer"}">Customer</option><option value="${"seller"}">Seller</option></select>
        <label class="${"label-oval"}" for="${"role"}">Role</label>
        ${errors.role ? `<p class="${"error"}"><small style="${"color: red"}">${(0, import_index_7bf676ca.e)(errors.role)}</small></p>` : ``}</div>
      <div class="${"mt-10 flex justify-between"}"><button type="${"reset"}" class="${"btn ripple"}">Cancelar</button>
        <button class="${"btn ripple"}">Crear</button></div></form></div>`;
      }
    })}`;
  } while (!$$settled);
  $$unsubscribe_settings();
  $$unsubscribe_credentials();
  return $$rendered;
});
