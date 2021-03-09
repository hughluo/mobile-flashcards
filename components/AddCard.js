import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';

import { addCard } from '../actions';
import { sumbitAddCard } from '../utils/api';

import AlertModal from './AlertModal';
import TextButton from './TextButton';

function AddCard({ deckTitle, dispatch }) {
	const navigation = useNavigation();
	const [ questionInput, setQuestionInput ] = React.useState('');
	const [ answerInput, setAnswerInput ] = React.useState('');
	const [ modalVisible, setModalVisible ] = React.useState(false);
	const [ modalMessage, setModalMessage ] = React.useState('');

	const handleSubmit = () => {
		if (questionInput === '') {
			setModalMessage('Question cannot be empty!');
			setModalVisible(true);
			return;
		}
		if (answerInput === '') {
			setModalMessage('Answer cannot be empty!');
			setModalVisible(true);
			return;
		}
		const card = {
			question: questionInput,
			answer: answerInput
		};
		dispatch(addCard(card, deckTitle));
		const popAction = StackActions.pop(1);
		navigation.dispatch(popAction);
	};
	const onAlertModalButtonPress = () => {
		setModalVisible(!modalVisible);
	};
	return (
		<KeyboardAvoidingView style={styles.centeredView}>
			<AlertModal
				visible={modalVisible}
				message={modalMessage}
				buttonText="Cool"
				onButtonPress={() => onAlertModalButtonPress()}
			/>
			<View>
				<Text style={styles.text}> Enter the question: </Text>
				<TextInput value={questionInput} style={styles.input} onChangeText={(text) => setQuestionInput(text)} />
			</View>
			<View>
				<Text style={styles.text}> Enter the answer: </Text>
				<TextInput value={answerInput} style={styles.input} onChangeText={(text) => setAnswerInput(text)} />
			</View>
			<TextButton text="Submit" onPress={() => handleSubmit()} />
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22
	},
	text: {
		fontSize: 20,
		paddingTop: 20
	},
	input: {
		width: 200,
		height: 50,
		padding: 8,
		borderWidth: 1,
		borderColor: 'gray',
		margin: 20
	}
});

function mapStateToProps(decks, { route }) {
	const { title } = route.params;
	return { deckTitle: title };
}

export default connect(mapStateToProps)(AddCard);
