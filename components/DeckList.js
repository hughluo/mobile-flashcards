import React from 'react';

import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';

function DeckList({ decks }) {
	if (Object.keys(decks).length === 0) {
		return (
			<View style={styles.noDataText}>
				<Text>No Deck found. Create Deck first!</Text>
			</View>
		);
	}
	return (
		<View>
			<Text> {JSON.stringify(decks)}</Text>
			{Object.keys(decks).map((title) => JSON.stringify(decks[title]))}
		</View>
	);
}

const styles = StyleSheet.create({
	noDataText: {
		fontSize: 20,
		paddingTop: 20,
		paddingBottom: 20
	}
});

function mapStateToProps(decks) {
	return { decks };
}

export default connect(mapStateToProps)(DeckList);
