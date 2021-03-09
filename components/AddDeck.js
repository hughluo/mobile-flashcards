import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';

import { addDeck } from '../actions';

import AlertModal from './AlertModal';
import TextButton from './TextButton';

function AddDeck({ decks, dispatch }) {
	const [ input, setInput ] = React.useState('');
	const [ modalVisible, setModalVisible ] = React.useState(false);
	const [ modalMessage, setModalMessage ] = React.useState('');

	const onInputChange = (text) => {
		setInput(text);
	};
	const onDeckCreate = () => {
		if (input === '') {
			setModalMessage('Deck name cannot be empty!');
			setModalVisible(true);
			return;
		}
		if (decks[input]) {
			setModalMessage(`Deck title "${input}" already exist! Pick another one.`);
			setModalVisible(true);
			return;
		}
		dispatch(
			addDeck({
				title: input,
				questions: []
			})
		);
	};
	const onAlertModalButtonPress = () => {
		setModalVisible(!modalVisible);
		setInput('');
	};
	return (
		<KeyboardAvoidingView style={styles.centeredView}>
			<AlertModal
				visible={modalVisible}
				message={modalMessage}
				buttonText="Cool"
				onButtonPress={() => onAlertModalButtonPress()}
			/>
			<Text style={styles.text}> Create a new Deck by entering the name</Text>
			<TextInput value={input} style={styles.input} onChangeText={(text) => onInputChange(text)} />
			<TextButton text="Create" onPress={() => onDeckCreate()} />
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
		paddingTop: 20,
		paddingBottom: 20
	},
	input: {
		width: 200,
		height: 50,
		padding: 8,
		borderWidth: 1,
		borderColor: 'gray',
		margin: 50
	}
});

function mapStateToProps(decks) {
	return { decks };
}

export default connect(mapStateToProps)(AddDeck);
