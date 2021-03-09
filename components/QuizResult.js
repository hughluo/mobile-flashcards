import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';

import TextButton from './TextButton';
import { startQuiz } from '../actions/quiz';

function QuizResult({ ready, deckTitle, questionAmount, correctAmount, dispatch }) {
	if (!ready) {
		return (
			<View style={styles.centeredView}>
				<ActivityIndicator size="large" />
			</View>
		);
	}
	const navigation = useNavigation();

	const handleToHome = () => {
		navigation.navigate('Home');
	};
	const handleRetake = () => {
		dispatch(startQuiz(deckTitle, questionAmount));
		replaceAction = StackActions.replace('Quiz', {
			deckTitle
		});
		navigation.dispatch(replaceAction);
	};
	return (
		<View style={styles.centeredView}>
			<Text style={{ fontSize: 30, margin: 10 }}>{`You scored ${correctAmount} on deck '${deckTitle}'`}</Text>
			<Text
				style={{ fontSize: 16, color: 'tomato' }}
			>{`${correctAmount} / ${questionAmount} Questions answered correctly`}</Text>
			<View style={styles.buttonGroup}>
				<TextButton buttonColor="black" text="Back to Home" onPress={handleToHome} />
				<TextButton text="Retake Quiz" onPress={handleRetake} />
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

function mapStateToProps({ decks, quiz }, { route }) {
	const { deckTitle, correctAmount, questionAmount } = quiz;

	return {
		ready: deckTitle !== undefined,
		deckTitle,
		correctAmount,
		questionAmount
	};
}

export default connect(mapStateToProps)(QuizResult);
