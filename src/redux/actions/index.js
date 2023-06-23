// import fetchTrivia from '../../services/featchTrivia';

export const SAVE_PLAYER = 'SAVE_PLAYER';
export const REQUEST_TRIVIA = 'REQUEST_TRIVIA';
export const REQUEST_TRIVIA_SUCCESS = 'REQUEST_TRIVIA_SUCCESS';
export const REQUEST_TRIVIA_FAILURE = 'REQUEST_TRIVIA_FAILURE';

export const savePlayer = (player) => ({
  type: SAVE_PLAYER,
  player,
});
