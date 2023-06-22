import { getStore, setStore } from '../helpers/localStorage';

const tokenURL = 'https://opentdb.com/api_token.php?command=request';
const triviaURL = 'https://opentdb.com/api.php?amount=5&token=';

const fetchToken = async () => {
  const response = await fetch(tokenURL);
  const data = await response.json();
  setStore('token', data.token);
  return data;
};

const fetchTrivia = async () => {
  const { token } = (getStore() || (await fetchToken()));
  const response = await fetch(`${triviaURL}${token}`);
  const data = await response.json();
  if (data.response_code === 0) return data;
  setStore('token', (await fetchToken()).token);
  return fetchTrivia();
};

export default fetchTrivia;
