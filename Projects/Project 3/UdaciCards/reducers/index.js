import { GET_DECKS_SUCCESS, ADD_DECK_SUCCESS } from "../actions";

const decks = (state = {}, action) => {
  switch (action.type) {
    case GET_DECKS_SUCCESS:
      return {
        ...state,
        ...action.decks
      };
    case ADD_DECK_SUCCESS:
      return {
        ...state,
        [action.deck]: {
          title: action.deck,
          questions: []
        }
      };
    default:
      return state;
  }
};

export default decks;
