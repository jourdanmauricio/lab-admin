import { writable } from "svelte/store";
import { get } from "svelte/store";

const createUserLogin = () => {
  const { subscribe, update, set } = writable(false);

  return {
    subscribe,
    login: () => {
      update((value) => (value = true));
    },
    logout: () => {
      set(false);
    },
  };
};

export const isLogged = createUserLogin();

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
      documentNumber: "",
    },
  });

  return {
    subscribe,
    setCredentials: (credentials) => {
      set(credentials);
    },
  };
};

export const credentials = createCredentials();

const createNotification = () => {
  const { subscribe, update, set } = writable({});

  return {
    subscribe,
    show: (message, type) => {
      set({ message: message, type: type, show: true });
      setTimeout(function () {
        set({});
      }, 3000);
    },
    clear: () => {
      set({});
      return notification;
    },
  };
};

export const notification = createNotification();

const createLoading = () => {
  const { subscribe, update, set } = writable(false);

  return {
    subscribe,
    show: (value) => {
      update((loading) => (loading = value));
    },
  };
};

export const loading = createLoading();

const createSettings = () => {
  const { subscribe, update, set } = writable({ itemsxpage: 10 });
  return {
    subscribe,
    changeQuantity: (quantity) => {
      update((settings) => (settings = { ...settings, itemsxpage: quantity }));
    },
    setSettings: (value) => {
      set(value);
    },
  };
};

export const settings = createSettings();

let newProduct = {
  site_id: "MLA",
  sale_terms: [],
  category_id: "",
  category: {},
  variations: [],
  sku: null,
};

const createProduct = () => {
  const { subscribe, update, set } = writable(newProduct);

  return {
    subscribe,
    setProduct: (product) => {
      set(product);
    },
    update: (property) => {
      update((product) => (product = { ...product, ...property }));
      let prop = Object.keys(property)[0];
      let proper = get(product).properties;
      if (prop !== "properties")
        if (proper) {
          let index = proper.findIndex((el) => el === prop);
          if (index === -1) proper.push(prop);
        }
    },
  };
};

export const product = createProduct();
