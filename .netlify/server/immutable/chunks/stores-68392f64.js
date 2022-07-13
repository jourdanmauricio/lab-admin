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
  c: () => credentials,
  i: () => isLogged,
  n: () => notification,
  s: () => settings,
  w: () => writable
});
module.exports = __toCommonJS(stdin_exports);
var import_index_9af3cff5 = require("./index-9af3cff5.js");
const subscriber_queue = [];
function writable(value, start = import_index_9af3cff5.n) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if ((0, import_index_9af3cff5.d)(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe(run, invalidate = import_index_9af3cff5.n) {
    const subscriber = [run, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || import_index_9af3cff5.n;
    }
    run(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe };
}
const createUserLogin = () => {
  const { subscribe, update, set } = writable(false);
  return {
    subscribe,
    login: () => {
      update((value) => true);
    },
    logout: () => {
      set(false);
    }
  };
};
const isLogged = createUserLogin();
const createCredentials = () => {
  const { subscribe, update, set } = writable({
    email: "",
    id: "",
    token: "",
    role: "",
    customer: {
      name: "",
      lastName: "",
      phone: "",
      documentType: "",
      documentNumber: ""
    }
  });
  return {
    subscribe,
    setCredentials: (credentials2) => {
      set(credentials2);
    }
  };
};
const credentials = createCredentials();
const createNotification = () => {
  const { subscribe, update, set } = writable({});
  return {
    subscribe,
    show: (message, type) => {
      set({ message, type, show: true });
      setTimeout(function() {
        set({});
      }, 3e3);
    },
    clear: () => {
      set({});
      return notification;
    }
  };
};
const notification = createNotification();
const createSettings = () => {
  const { subscribe, update, set } = writable({ itemsxpage: 10 });
  return {
    subscribe,
    changeQuantity: (quantity) => {
      update((settings2) => settings2 = { ...settings2, itemsxpage: quantity });
    },
    setSettings: (value) => {
      set(value);
    }
  };
};
const settings = createSettings();
