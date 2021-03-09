import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';

import { answerQuestion } from '../actions/quiz';

import TextButton from './TextButton';

function Quiz({ ready, deck, dispatch }) {
	if (!ready) {
		return (
			<View style={styles.centeredView}>
				<ActivityIndicator size="large" />
			</View>
		);
	}
	const navigation = useNavigation();
	const { questions, title } = deck;
	const questionAmount = questions.length;
	const [ questionIndex, setQuestionIndex ] = React.useState(0);
	const [ showAnswer, setShowAnswer ] = React.useState(false);

	const handleNext = (isCorrect) => {
		// setCorrectAmount(correctAmount + 1);
		dispatch(answerQuestion(isCorrect));

		if (questionIndex == questionAmount - 1) {
			// last question
			replaceAction = StackActions.replace('Quiz Result', {
				deckTitle: title
			});
			navigation.dispatch(replaceAction);
		} else {
			setQuestionIndex(questionIndex + 1);
		}
	};

	const { question, answer } = questions[questionIndex];
	return (
		<View style={styles.centeredView}>
			<Text style={{ fontSize: 30, margin: 30 }}>{`${questionIndex + 1}/${questionAmount}`}</Text>
			<Text style={{ fontSize: 50, margin: 10 }}>{question}</Text>
			{<Text style={{ fontSize: 30, margin: 10 }}>{showAnswer ? answer : ' '}</Text>}
			<View style={styles.buttonGroup}>
				<TextButton
					text={showAnswer ? 'hide answer' : 'show answer'}
					onPress={() => setShowAnswer(!showAnswer)}
				/>
				<TextButton buttonColor="green" text="My answer is correct" onPress={() => handleNext(true)} />
				<TextButton buttonColor="black" text="My answer is incorrect" onPress={() => handleNext(false)} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22
	},
	container: {
		flex: 1,
		marginTop: 22
	},
	buttonGroup: {
		alignSelf: 'stretch',
		padding: 20,
		margin: 10
	}
});

function mapStateToProps({ decks }, { route }) {
	const { deckTitle } = route.params;
	const deck = decks[deckTitle];

	return {
		ready: deckTitle && deck,
		deck
	};
}

export default connect(mapStateToProps)(Quiz);
