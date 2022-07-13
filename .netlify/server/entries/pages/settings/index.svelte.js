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
  default: () => Settings
});
module.exports = __toCommonJS(stdin_exports);
var import_index_9af3cff5 = require("../../../immutable/chunks/index-9af3cff5.js");
var import_Api_c88b9546 = require("../../../immutable/chunks/Api-c88b9546.js");
var import_stores_68392f64 = require("../../../immutable/chunks/stores-68392f64.js");
var import_Spinner_0a5d3b24 = require("../../../immutable/chunks/Spinner-0a5d3b24.js");
var import_Pagination_fc89f996 = require("../../../immutable/chunks/Pagination-fc89f996.js");
var import_Modal2_1c1ca4f8 = require("../../../immutable/chunks/Modal2-1c1ca4f8.js");
var import_axios = require("axios");
var import_variables_09701ff1 = require("../../../immutable/chunks/variables-09701ff1.js");
const ConfML = (0, import_index_9af3cff5.c)(($$result, $$props, $$bindings, slots) => {
  let nickname = "";
  return `<div class="${"relative mt-8 inline-block"}"><input class="${"input-oval max-w-xs"}" name="${"nickname"}" type="${"text"}"${(0, import_index_9af3cff5.h)("value", nickname, 0)}>
  <label class="${"label-oval"}" for="${"nickname"}">Nickname</label></div>
<button class="${"btn ripple inline-block ml-4"}">Autorizar</button>

<button class="${"btn ripple inline-block mt-10"}">Confirmar</button>`;
});
const getCategories = async (limit, offset, search) => {
  try {
    let paramSearch = !search ? "" : `&q=${search}`;
    const response = await import_Api_c88b9546.A.get(`/categories?limit=${limit}&offset=${offset}${paramSearch}`);
    return response;
  } catch (error) {
    console.log("error", error);
    let message = "";
    message = error.response.data ? `${error.response.data.statusCode}: ${error.response.data.message}` : "Error Obteniendo categor\xEDa \u{1F61E}";
    throw message;
  }
};
var Categories_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => '@media only screen and (max-width: 1024px){td.svelte-3pspa0:nth-of-type(1):before{content:"Id"}td.svelte-3pspa0:nth-of-type(2):before{content:"ML ID"}td.svelte-3pspa0:nth-of-type(3):before{content:"Categor\xEDa"}td.svelte-3pspa0:nth-of-type(4):before{content:"Acciones"}input.svelte-3pspa0:-webkit-autofill,input.svelte-3pspa0:-webkit-autofill:hover,input.svelte-3pspa0:-webkit-autofill:focus{-webkit-transition:background-color 5000s ease-in-out 0s;transition:background-color 5000s ease-in-out 0s}}')();
const css$2 = {
  code: '@media only screen and (max-width: 1024px){td.svelte-3pspa0:nth-of-type(1):before{content:"Id"}td.svelte-3pspa0:nth-of-type(2):before{content:"ML ID"}td.svelte-3pspa0:nth-of-type(3):before{content:"Categor\xEDa"}td.svelte-3pspa0:nth-of-type(4):before{content:"Acciones"}input.svelte-3pspa0:-webkit-autofill,input.svelte-3pspa0:-webkit-autofill:hover,input.svelte-3pspa0:-webkit-autofill:focus{-webkit-transition:background-color 5000s ease-in-out 0s;transition:background-color 5000s ease-in-out 0s}}',
  map: null
};
const Categories = (0, import_index_9af3cff5.c)(($$result, $$props, $$bindings, slots) => {
  let $settings, $$unsubscribe_settings;
  $$unsubscribe_settings = (0, import_index_9af3cff5.a)(import_stores_68392f64.s, (value) => $settings = value);
  let modalDelete;
  let modalCreate;
  let categories = [];
  let search = null;
  let pagination = { limit: $settings.itemsxpage, offset: 0 };
  let currentCat = null;
  let isLoading = false;
  let results = [];
  async function loadData() {
    try {
      isLoading = true;
      const data = await getCategories(pagination.limit, pagination.offset, search);
      categories = data.results;
      pagination = {
        limit: data.paging.limit,
        offset: data.paging.offset,
        total: data.paging.total,
        results: data.results.length
      };
    } catch (error) {
      import_stores_68392f64.n.show(error, "error");
    } finally {
      isLoading = false;
    }
  }
  function refreshData(pag) {
    pagination = pag;
    loadData();
  }
  $$result.css.add(css$2);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<caption class="${"flex items-center justify-between mt-10 flex-col sm:flex-row bg-secondaryColor text-white min-w-[320px] border px-10 py-1 border-gray-900 "}"><div class="${"flex"}"><i class="${"material-icons text-green-700 active:text-gray-300 cursor-pointer"}">file_download</i>
    <span class="${"text-lg ml-1"}">Categor\xEDas: ${(0, import_index_9af3cff5.e)(pagination.total)}</span></div>
  <div class="${"flex items-center"}"><input class="${"text-black w-[250px] pl-1 svelte-3pspa0"}" name="${"search"}" type="${"search"}"${(0, import_index_9af3cff5.h)("value", search, 0)}>
    </div>
  <button><i class="${"material-icons mt-1 text-teal-700"}">add_circle</i></button></caption>

<table id="${"tblData"}" class="${"responsive-table"}"><thead><tr><th>Id</th>
      <th>ML ID</th>
      <th>Categor\xEDa</th>
      <th>Acciones</th></tr></thead>
  <tbody>${(0, import_index_9af3cff5.b)(categories, (category) => {
      return `<tr><td class="${"svelte-3pspa0"}">${(0, import_index_9af3cff5.e)(category.id)}</td>
        <td class="${"svelte-3pspa0"}">${(0, import_index_9af3cff5.e)(category.mlId)}</td>
        <td class="${"svelte-3pspa0"}">${(0, import_index_9af3cff5.e)(category.fullName)}</td>
        <td class="${"svelte-3pspa0"}"><button${(0, import_index_9af3cff5.h)("id", category.id, 0)}><i class="${"material-icons"}" style="${"color: red"}">delete</i></button></td>
      </tr>`;
    })}</tbody></table>
${pagination.total ? `${(0, import_index_9af3cff5.v)(import_Pagination_fc89f996.P, "Pagination").$$render($$result, { refreshData, pagination }, {}, {})}` : ``}

${(0, import_index_9af3cff5.v)(import_Modal2_1c1ca4f8.M, "Modal2").$$render($$result, { this: modalDelete }, {
      this: ($$value) => {
        modalDelete = $$value;
        $$settled = false;
      }
    }, {
      default: () => {
        return `<h2 class="${"text-2xl text-center"}">Eliminar Categor\xEDa ${(0, import_index_9af3cff5.e)(currentCat.mlId)} - ${(0, import_index_9af3cff5.e)(currentCat.name)}</h2>
  <div class="${"py-4"}"><div class="${"w-full border-t border-gray-900"}"></div></div>

  <p class="${"mt-5 min-w-[350px]"}">Est\xE1 seguro de eliminar la categor\xEDa?</p>

  

  <div class="${"mt-10 flex justify-between"}"><button class="${"ripple rounded bg-red-900 text-white py-1 px-10 "}">Eliminar</button>
    <button class="${"ripple btn"}">Cancelar</button></div>`;
      }
    })}

${(0, import_index_9af3cff5.v)(import_Modal2_1c1ca4f8.M, "Modal2").$$render($$result, { this: modalCreate }, {
      this: ($$value) => {
        modalCreate = $$value;
        $$settled = false;
      }
    }, {
      default: () => {
        return `<div class="${"w-[80vw]"}"><h2 class="${"text-2xl text-center"}">Crear categor\xEDa</h2>
    <div class="${"py-4"}"><div class="${"border-t border-gray-900"}"></div></div>

    <div class="${"relative mt-4"}"><input class="${"input-oval svelte-3pspa0"}" type="${"text"}" name="${"description"}" required="${"required"}">
      <label class="${"label-oval"}" for="${"description"}">Descripci\xF3n</label></div>

    ${(0, import_index_9af3cff5.e)(results.length)}

    ${results.length > 0 ? `<select class="${"block ml-auto mr-auto justify-center mt-4 w-fit border bg-transparent overflow-y-hidden"}" name="${"catPredictor"}" id="${"catPredictor"}"${(0, import_index_9af3cff5.h)("size", results.length + 1, 0)}><option disabled class="${"border border-gray-600 border-solid"}" value="${"false"}">Seleccione una categor\xEDa</option>${(0, import_index_9af3cff5.b)(results, (category) => {
          return `<option class="${"h-fit whitespace-normal border border-gray-600 border-solid"}"${(0, import_index_9af3cff5.h)("value", category, 0)}>${(0, import_index_9af3cff5.b)(category.path_from_root, (parent, index) => {
            return `${index === 0 ? `${(0, import_index_9af3cff5.e)(parent.name)}` : `\xA0/\xA0${(0, import_index_9af3cff5.e)(parent.name)}`}`;
          })}
          </option>`;
        })}</select>
      <div class="${"flex justify-between mt-4"}"><button class="${"btn ripple block"}">Cancelar</button>
        <button class="${"btn ripple block"}">Crear categor\xEDa</button></div>` : ``}

    ${isLoading ? `${(0, import_index_9af3cff5.v)(import_Spinner_0a5d3b24.S, "Spinner").$$render($$result, {}, {}, {})}` : ``}</div>`;
      }
    })}`;
  } while (!$$settled);
  $$unsubscribe_settings();
  return $$rendered;
});
const General = (0, import_index_9af3cff5.c)(($$result, $$props, $$bindings, slots) => {
  let $settings, $$unsubscribe_settings;
  $$unsubscribe_settings = (0, import_index_9af3cff5.a)(import_stores_68392f64.s, (value) => $settings = value);
  $$unsubscribe_settings();
  return `<div class="${"mt-5"}"><label for="${"itemsxpage"}">Cantidad de filas x p\xE1gina </label>
  <select class="${"ml-2 bg-transparent border border-solid border-gray-700"}" name="${"itemsxpage"}" id="${"itemsxpage"}"><option ${$settings.itemsxpage === "10" ? "selected" : ""} value="${"10"}">10</option><option ${$settings.itemsxpage === "30" ? "selected" : ""} value="${"30"}">30</option><option ${$settings.itemsxpage === "50" ? "selected" : ""} value="${"50"}">50</option></select></div>`;
});
const TABS = {};
const Tabs = (0, import_index_9af3cff5.c)(($$result, $$props, $$bindings, slots) => {
  const tabs = [];
  const panels = [];
  const selectedTab = (0, import_stores_68392f64.w)(null);
  const selectedPanel = (0, import_stores_68392f64.w)(null);
  (0, import_index_9af3cff5.s)(TABS, {
    registerTab: (tab) => {
      tabs.push(tab);
      selectedTab.update((current) => current || tab);
      (0, import_index_9af3cff5.o)(() => {
        const i = tabs.indexOf(tab);
        tabs.splice(i, 1);
        selectedTab.update((current) => current === tab ? tabs[i] || tabs[tabs.length - 1] : current);
      });
    },
    registerPanel: (panel) => {
      panels.push(panel);
      selectedPanel.update((current) => current || panel);
      (0, import_index_9af3cff5.o)(() => {
        const i = panels.indexOf(panel);
        panels.splice(i, 1);
        selectedPanel.update((current) => current === panel ? panels[i] || panels[panels.length - 1] : current);
      });
    },
    selectTab: (tab) => {
      const i = tabs.indexOf(tab);
      selectedTab.set(tab);
      selectedPanel.set(panels[i]);
    },
    selectedTab,
    selectedPanel
  });
  return `<div class="${"tabs"}">${slots.default ? slots.default({}) : ``}</div>`;
});
var TabList_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => ".tab-list.svelte-t7wjas{border-bottom:1px solid teal}")();
const css$1 = {
  code: ".tab-list.svelte-t7wjas{border-bottom:1px solid teal}",
  map: null
};
const TabList = (0, import_index_9af3cff5.c)(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<div class="${"tab-list svelte-t7wjas"}">${slots.default ? slots.default({}) : ``}
</div>`;
});
const TabPanel = (0, import_index_9af3cff5.c)(($$result, $$props, $$bindings, slots) => {
  let $selectedPanel, $$unsubscribe_selectedPanel;
  const panel = {};
  const { registerPanel, selectedPanel } = (0, import_index_9af3cff5.g)(TABS);
  $$unsubscribe_selectedPanel = (0, import_index_9af3cff5.a)(selectedPanel, (value) => $selectedPanel = value);
  registerPanel(panel);
  $$unsubscribe_selectedPanel();
  return `${$selectedPanel === panel ? `${slots.default ? slots.default({}) : ``}` : ``}`;
});
var Tab_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => "button.svelte-mjmq52{background:none;border:none;border-bottom:2px solid white;border-radius:0;margin:0;color:#ccc;margin-right:20px}.selected.svelte-mjmq52{border-bottom:2px solid teal;color:#333}")();
const css = {
  code: "button.svelte-mjmq52{background:none;border:none;border-bottom:2px solid white;border-radius:0;margin:0;color:#ccc;margin-right:20px}.selected.svelte-mjmq52{border-bottom:2px solid teal;color:#333}",
  map: null
};
const Tab = (0, import_index_9af3cff5.c)(($$result, $$props, $$bindings, slots) => {
  let $selectedTab, $$unsubscribe_selectedTab;
  const tab = {};
  const { registerTab, selectTab, selectedTab } = (0, import_index_9af3cff5.g)(TABS);
  $$unsubscribe_selectedTab = (0, import_index_9af3cff5.a)(selectedTab, (value) => $selectedTab = value);
  registerTab(tab);
  $$result.css.add(css);
  $$unsubscribe_selectedTab();
  return `<button class="${["svelte-mjmq52", $selectedTab === tab ? "selected" : ""].join(" ").trim()}">${slots.default ? slots.default({}) : ``}
</button>`;
});
const Settings = (0, import_index_9af3cff5.c)(($$result, $$props, $$bindings, slots) => {
  return `${(0, import_index_9af3cff5.v)(Tabs, "Tabs").$$render($$result, {}, {}, {
    default: () => {
      return `${(0, import_index_9af3cff5.v)(TabList, "TabList").$$render($$result, {}, {}, {
        default: () => {
          return `${(0, import_index_9af3cff5.v)(Tab, "Tab").$$render($$result, {}, {}, {
            default: () => {
              return `General`;
            }
          })}
    ${(0, import_index_9af3cff5.v)(Tab, "Tab").$$render($$result, {}, {}, {
            default: () => {
              return `Categor\xEDas`;
            }
          })}
    ${(0, import_index_9af3cff5.v)(Tab, "Tab").$$render($$result, {}, {}, {
            default: () => {
              return `Productos`;
            }
          })}
    ${(0, import_index_9af3cff5.v)(Tab, "Tab").$$render($$result, {}, {}, {
            default: () => {
              return `ML`;
            }
          })}`;
        }
      })}

  ${(0, import_index_9af3cff5.v)(TabPanel, "TabPanel").$$render($$result, {}, {}, {
        default: () => {
          return `${(0, import_index_9af3cff5.v)(General, "General").$$render($$result, {}, {}, {})}`;
        }
      })}

  ${(0, import_index_9af3cff5.v)(TabPanel, "TabPanel").$$render($$result, {}, {}, {
        default: () => {
          return `${(0, import_index_9af3cff5.v)(Categories, "Categories").$$render($$result, {}, {}, {})}`;
        }
      })}

  ${(0, import_index_9af3cff5.v)(TabPanel, "TabPanel").$$render($$result, {}, {}, {
        default: () => {
          return `<h2>Third panel</h2>`;
        }
      })}

  ${(0, import_index_9af3cff5.v)(TabPanel, "TabPanel").$$render($$result, {}, {}, {
        default: () => {
          return `${(0, import_index_9af3cff5.v)(ConfML, "ConfML").$$render($$result, {}, {}, {})}`;
        }
      })}`;
    }
  })}`;
});
