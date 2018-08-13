// To manage your AsyncStorage database, you'll want to create four different helper methods.
// getDecks: return all of the decks along with their titles, questions, and answers.
// getDeck: take in a single id argument and return the deck associated with that id.
// saveDeckTitle: take in a single title argument and add it to the decks.
// addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.

import { AsyncStorage } from "react-native";

export const DECKS_STORAGE_KEY = "Udacicards:key";

export function getDeck() {}

export function getDecks(id) {}

export function _saveDeckTitle(title) {
  return AsyncStorage.mergeItem(
    DECKS_STORAGE_KEY,
    JSON.stringify({
      [title]: {
        title,
        questions: []
      }
    }),
    () => {
      AsyncStorage.getItem(DECKS_STORAGE_KEY, (err, result) => {
        // console.log(err);
      });
    }
  );
}

export function _addCardToDeck(title, card) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(results => {
    const data = JSON.parse(results);
    // console.log(data[title]);
    data[title].questions.push(card);
    console.log(data[title]);
    // data[title] = undefined;
    // delete data[title];
    // AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
  });
}
