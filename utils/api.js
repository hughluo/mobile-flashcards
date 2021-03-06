import AsyncStorage from '@react-native-async-storage/async-storage';

import { FLASHCARDS_STORAGE_KEY } from './_flashcards';

export const getDecks = async () => {
	try {
		const value = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY);
		if (value !== null) {
			return JSON.parse(value);
		} else {
			return null;
		}
	} catch (e) {
		console.log('Error in getDecks: ', e);
	}
};

export const sumbitAddDeck = async (deck) => {
	try {
		await AsyncStorage.mergeItem(
			FLASHCARDS_STORAGE_KEY,
			JSON.stringify({
				[deck.title]: deck
			})
		);
	} catch (e) {
		console.log('Error in sumbitAddDeck: ', e);
	}
};

export const sumbitAddCard = async (card, deckTitle) => {
	try {
		await AsyncStorage.mergeItem(
			FLASHCARDS_STORAGE_KEY,
			JSON.stringify({
				[deckTitle]: {
					questions: [ card ]
				}
			})
		);
	} catch (e) {
		console.log('Error in sumbitAddCard: ', e);
	}
};

export function removeEntry(deckTitle) {
	return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then((results) => {
		const key = deckTitle;
		const data = JSON.parse(results);
		data[key] = undefined;
		delete data[key];
		AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data));
	});
}
