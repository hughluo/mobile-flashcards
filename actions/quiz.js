export const ANSWER_QUESTION = 'ANSWER_QUESTION';
export const START_QUIZ = 'START_QUIZ';

export function answerQuestion(isCorrect) {
	return {
		type: ANSWER_QUESTION,
		isCorrect
	};
}

export function startQuiz(deckTitle, questionAmount) {
	return {
		type: START_QUIZ,
		quiz: {
			deckTitle,
			correctAmount: 0,
			answeredAmount: 0,
			questionAmount
		}
	};
}
