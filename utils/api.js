import AsyncStorage from '@react-native-async-storage/async-storage';

import { dummyDecks, FLASHCARDS_STORAGE_KEY } from './_flashcards';

export const getFlashCards = async () => {
	try {
		const value = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY);
		if (value !== null) {
			return JSON.parse(value);
		} else {
			return dummyDecks();
		}
	} catch (e) {
		console.log('Error in getFlashCards: ', e);
	}
};

export function createNewDeck(deck) {
	return AsyncStorage.mergeItem(
		FLASHCARDS_STORAGE_KEY,
		JSON.stringify({
			[deck.title]: deck
		})
	);
}

export function removeEntry(deckTitle) {
	return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then((results) => {
		const key = deckTitle;
		const data = JSON.parse(results);
		data[key] = undefined;
		delete data[key];
		AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data));
	});
}
