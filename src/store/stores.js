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
