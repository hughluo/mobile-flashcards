import { ADD_CARD, ADD_DECK, RECEIVE_DECKS } from '../actions/decks';

export default function decks(state = {}, action) {
	switch (action.type) {
		case RECEIVE_DECKS:
			return {
				...state,
				...action.decks
			};
		case ADD_DECK:
			return {
				...state,
				[action.deck.title]: action.deck
			};
		case ADD_CARD:
			const deckTitle = action.deckTitle;
			return {
				...state,
				[deckTitle]: {
					...state[deckTitle],
					questions: [ ...state[deckTitle].questions, action.card ]
				}
			};
		default:
			return state;
	}
}
