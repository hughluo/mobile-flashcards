import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { startQuiz } from '../actions/quiz';

import TextButton from './TextButton';

function DeckDetail({ deck, dispatch }) {
	const navigation = useNavigation();
	const { title, questions } = deck;
	const deckTitle = title;
	const questionAmount = questions.length;
	const handleAddCard = () => {
		console.log('Add Card Pressed!');
		navigation.navigate('Add Card', { deckTitle });
	};
	const handleStartQuiz = () => {
		console.log('Start Quiz Pressed!');
		dispatch(startQuiz(deckTitle, questionAmount));
		navigation.navigate('Quiz', { deckTitle });
	};
	return (
		<View style={styles.centeredView}>
			<Text style={{ fontSize: 50 }}>{`Deck '${deckTitle}'`}</Text>
			<Text style={{ fontSize: 32, color: 'gray' }}>{questionAmount} Questions</Text>
			<View style={styles.buttonGroup}>
				<TextButton buttonColor="black" text="Add Card" onPress={() => handleAddCard()} />
				<TextButton text="Start Quiz" onPress={() => handleStartQuiz()} />
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
	const { title } = route.params;

	return {
		deck: decks[title]
	};
}

export default connect(mapStateToProps)(DeckDetail);
