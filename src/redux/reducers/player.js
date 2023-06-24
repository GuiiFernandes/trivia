import { ADD_SCORE, SAVE_PLAYER, RESET_GAME_DATA } from '../actions';

const initialState = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = initialState, action) => {
  switch (action.type) {
  case SAVE_PLAYER:
    return {
      ...state,
      ...action.player,
    };
  case ADD_SCORE:
    return {
      ...state,
      score: state.score + action.score,
      assertions: state.assertions + 1,
    };
  case RESET_GAME_DATA:
    return initialState;
  default:
    return state;
  }
};

export default player;
