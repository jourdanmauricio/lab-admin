import { writable } from "svelte/store";

// export let itemsxpage = writable(10);
export const settings = writable({ itemsxpage: 10 });

export const changeQuantity = (quantity) => {
  itemsxpage.update((value) => {
    const updSettings = { ...value, itemsxpage: quantity };
    return updSettings;
  });
};
