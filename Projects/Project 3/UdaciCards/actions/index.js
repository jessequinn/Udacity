export const GET_DECKS_SUCCESS = "GET_DECKS_SUCCESS";
export const ADD_DECK_SUCCESS = "ADD_DECK_SUCCESS";

export function _getDecks(decks) {
  return {
    type: GET_DECKS_SUCCESS,
    decks
  };
}

export function _addDeck(deck) {
  return {
    type: ADD_DECK_SUCCESS,
    deck
  };
}
