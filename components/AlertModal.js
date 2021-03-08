import React from 'react';
import {
	Alert,
	StyleSheet,
	Text,
	View,
	TextInput,
	KeyboardAvoidingView,
	TouchableOpacity,
	Modal,
	Pressable
} from 'react-native';

function ModalAlert({ message, buttonText, onButtonPress, visible }) {
	return (
		<View style={styles.centeredView}>
			<Modal
				animationType="fade"
				transparent={true}
				visible={visible}
				onRequestClose={() => {
					Alert.alert('Modal has been closed.');
					onButtonPress();
				}}
			>
				<View style={styles.centeredView}>
					<View style={styles.modalInnerView}>
						<Text style={styles.modalText}>{message}</Text>
						<Pressable style={[ styles.button, styles.buttonClose ]} onPress={onButtonPress}>
							<Text style={styles.textStyle}>{buttonText}</Text>
						</Pressable>
					</View>
				</View>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	centeredView: {
		marginTop: 50
	},
	modalInnerView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 35,
		alignItems: 'center',
		alignContent: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2
	},
	buttonOpen: {
		backgroundColor: '#F194FF'
	},
	buttonClose: {
		backgroundColor: '#2196F3'
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center'
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center'
	}
});

export default ModalAlert;
