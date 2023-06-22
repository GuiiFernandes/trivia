import { REQUEST_TRIVIA, REQUEST_TRIVIA_SUCCESS } from '../actions';

const initialState = {
  questions: [],
  questionIndex: 0,
  isLoading: false,
};

const game = (state = initialState, action) => {
  switch (action.type) {
  case REQUEST_TRIVIA:
    return {
      ...state,
      isLoading: true,
    };
  case REQUEST_TRIVIA_SUCCESS:
    return {
      ...state,
      questions: action.questions,
      isLoading: false,
    };
  default:
    return state;
  }
};

export default game;
