export const getStore = () => JSON.parse(localStorage.getItem('trivia'));
export const setStore = (key, value) => {
  localStorage.setItem(key, value);
};
