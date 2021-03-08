import React from 'react';

import { View, Text } from 'react-native';

function Deck({ deck }) {
	return (
		<View>
			<Text style={{ fontSize: 50 }}>{deck.title}</Text>
			<Text style={{ fontSize: 16, color: 'gray' }}>{deck.problems.length} Questions</Text>
		</View>
	);
}

export default Deck;
