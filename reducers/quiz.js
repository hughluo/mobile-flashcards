import { START_QUIZ, ANSWER_QUESTION } from '../actions/quiz';

export default function quiz(state = {}, action) {
	switch (action.type) {
		case START_QUIZ: {
			return {
				...state,
				...action.quiz
			};
		}
		case ANSWER_QUESTION: {
			return {
				...state,
				correctAmount: state.correctAmount + (action.isCorrect ? 1 : 0)
			};
		}
		default:
			return state;
	}
}
