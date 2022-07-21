import { writable } from "svelte/store";

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

const createProduct = () => {
  const { subscribe, update, set } = writable({
    site_id: "MLA",
    sale_terms: [],
    status: "active",
  });

  return {
    subscribe,
    setProduct: (product) => {
      set({ site_id: "MLA", sale_terms: [], status: "active" });
    },
    updateProduct: (property) => {
      update((product) => (product = { ...product, ...property }));
    },
  };
};

export const newProduct = createProduct();
