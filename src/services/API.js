// import { getStore, setStore } from '../helpers/localStorage';

const tokenURL = 'https://opentdb.com/api_token.php?command=request';
const triviaURL = 'https://opentdb.com/api.php?amount=5&token=';

export const fetchToken = async () => {
  const response = await fetch(tokenURL);
  const data = await response.json();
  return data;
};

export const fetchTrivia = async (token) => {
  const response = await fetch(`${triviaURL}${token}`);
  const data = await response.json();
  return data;
};
