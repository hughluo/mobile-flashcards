import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';

import { addDeck } from '../actions';
import AlertModal from './AlertModal';

function AddDeck({ decks, dispatch }) {
	const [ input, setInput ] = React.useState('');
	const [ modalVisible, setModalVisible ] = React.useState(false);
	const onInputChange = (text) => {
		setInput(text);
	};
	const onDeckCreate = (event) => {
		if (decks[input]) {
			setModalVisible(true);
			return;
		}
		dispatch(
			addDeck({
				title: input,
				problems: []
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
				message={`Deck title "${input}" already exist! Pick another one.`}
				buttonText="Cool"
				onButtonPress={() => onAlertModalButtonPress()}
			/>
			<Text> Create a new Deck by entering the name</Text>
			<TextInput value={input} style={styles.input} onChangeText={(text) => onInputChange(text)} />
			<TouchableOpacity style={styles.button} onPress={onDeckCreate}>
				<Text>Create</Text>
			</TouchableOpacity>
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
	noDataText: {
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
