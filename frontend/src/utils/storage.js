// const STORAGE_PREFIX = "waptv_admin_panel_";
import { STORAGE_PREFIX } from "../constants";
const storage = {
  getToken: () => {
    return JSON.parse(window.localStorage.getItem(`${STORAGE_PREFIX}token`));
  },
  setToken: (token) => {
    window.localStorage.setItem(
      `${STORAGE_PREFIX}token`,
      JSON.stringify(token)
    );
  },
  clearToken: (token) => {
    window.localStorage.removeItem(`${STORAGE_PREFIX}token`);
  },

  get: (name) => {
    return JSON.parse(window.localStorage.getItem(`${STORAGE_PREFIX}${name}`));
  },

  clear: (name) => {
    window.localStorage.removeItem(`${STORAGE_PREFIX}${name}`);
  },
  set: (name, value) => {
    window.localStorage.setItem(
      `${STORAGE_PREFIX}${name}`,
      JSON.stringify(value)
    );
  },
};

export default storage;
