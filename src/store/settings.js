import { writable } from "svelte/store";

export const settings = writable({ itemsxpage: 10 });

export const changeQuantity = (quantity) => {
  settings.update((value) => {
    const updSettings = { ...value, itemsxpage: quantity };
    return updSettings;
  });
};

export const setSettings = (value) => {
  settings.set(value);
};
