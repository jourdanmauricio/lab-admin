import Api from "../Api";
import { get } from "svelte/store";
import { credentials } from "../../store/stores";

export const getSettings = async (id) => {
  try {
    const response = await Api.get(`/settings/${id}`);
    return response;
  } catch (error) {
    let message = "";
    message = error.response.data
      ? `${error.response.data.statusCode}: ${error.response.data.message}`
      : "Error Obteniendo configuración 😞";
    throw message;
  }
};

export const putSetting = async (setting) => {
  try {
    const user = get(credentials);
    const data = {
      user_id: user.id,
      setting: setting,
    };
    console.log("data", data);
    const settings = await Api.put(`/settings/${user.id}`, data);

    return settings;
  } catch (error) {
    let message = "";
    message = error.response.data
      ? `${error.response.data.statusCode}: ${error.response.data.message}`
      : "Error modificando configuración 😞";
    throw message;
  }
};

export const postSetting = async (data) => {
  try {
    console.log("data", data);
    const settings = await Api.post("/settings", data);
    return settings;
  } catch (error) {
    let message = "";
    message = error.response.data
      ? `${error.response.data.statusCode}: ${error.response.data.message}`
      : "Error creando configuración 😞";
    throw message;
  }
};
