// import fetchTrivia from '../../services/featchTrivia';

export const SAVE_PLAYER = 'SAVE_PLAYER';
export const ADD_SCORE = 'ADD_SCORE';
export const RESET_GAME_DATA = 'RESET_GAME_DATA';

export const savePlayer = (player) => ({
  type: SAVE_PLAYER,
  player,
});

export const addScore = (score) => ({
  type: ADD_SCORE,
  score,
});

export const resetGameData = () => ({
  type: RESET_GAME_DATA,
});
