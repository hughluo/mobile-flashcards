import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, TextInput, KeyboardAvoidingView, View } from 'react-native';

import { addDeck } from '../actions/decks';
import { sumbitAddDeck } from '../utils/api';

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
		const deck = {
			title: input,
			questions: []
		};
		dispatch(addDeck(deck));
		sumbitAddDeck(deck);
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
			<Text style={styles.text}> Give your new deck a name:</Text>
			<TextInput value={input} style={styles.input} onChangeText={(text) => onInputChange(text)} />
			<View style={styles.buttonGroup}>
				<TextButton text="Create" onPress={() => onDeckCreate()} />
			</View>
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
		width: 100,
		height: 50,
		padding: 8,
		borderWidth: 1,
		borderRadius: 7,
		borderColor: 'gray',
		margin: 20
	},
	buttonGroup: {
		alignSelf: 'stretch',
		padding: 20,
		margin: 10
	}
});

function mapStateToProps({ decks }) {
	return { decks };
}

export default connect(mapStateToProps)(AddDeck);
