import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

function TextButton({ text, onPress, buttonColor = 'tomato' }) {
	return (
		<Pressable
			style={[
				styles.button,
				{
					backgroundColor: buttonColor
				}
			]}
			onPress={onPress}
		>
			<Text style={styles.textStyle}>{text}</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		borderRadius: 20,
		padding: 10,
		margin: 5,
		elevation: 2
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center'
	}
});

export default TextButton;
