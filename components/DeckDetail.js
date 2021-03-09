import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';

import TextButton from './TextButton';

function DeckDetail({ deck }) {
	const handleAddCard = () => {
		console.log('Add Card Pressed!');
	};
	const handleStartQuiz = () => {
		console.log('Start Quiz Pressed!');
	};
	return (
		<View style={styles.centeredView}>
			<Text style={{ fontSize: 50 }}>{deck.title}</Text>
			<Text style={{ fontSize: 16, color: 'gray' }}>{deck.questions.length} Questions</Text>
			<View style={styles.buttonGroup}>
				<TextButton text="Add Card" onPress={handleAddCard} />
				<TextButton text="Start Quiz" onPress={handleStartQuiz} />
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
		padding: 20,
		margin: 10
	}
});

function mapStateToProps(decks, { route }) {
	const { title } = route.params;

	return {
		deck: decks[title]
	};
}

export default connect(mapStateToProps)(DeckDetail);
