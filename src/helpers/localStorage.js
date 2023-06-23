export const getStore = (key) => localStorage.getItem(key);

export const setStore = (key, value) => {
  localStorage.setItem(key, value);
};

export const removeStore = (key) => localStorage.removeItem(key);
