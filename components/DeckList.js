import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';

import { receiveDecks } from '../actions';
import { getDecks } from '../utils/api';
import Deck from './Deck';

function DeckList({ decks, dispatch }) {
	React.useEffect(() => {
		getDecks().then((decks) => dispatch(receiveDecks(decks)));
		console.log('DeckList get init data');
	}, []);

	if (Object.keys(decks).length === 0) {
		return (
			<View style={styles.centeredView}>
				<Text style={styles.noDataText}>No Deck found. Create Deck first!</Text>
			</View>
		);
	}
	return (
		<View style={styles.container}>
			{Object.keys(decks).map((title) => (
				<View key={title} style={styles.item}>
					<Deck deck={decks[title]} />
				</View>
			))}
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
	noDataText: {
		fontSize: 20,
		paddingTop: 20,
		paddingBottom: 20
	},
	item: {
		backgroundColor: 'white',
		borderRadius: 16,
		padding: 20,
		marginLeft: 10,
		marginRight: 10,
		marginTop: 17,
		alignContent: 'stretch',
		shadowRadius: 3,
		shadowOpacity: 0.8,
		shadowColor: 'rgba(0, 0, 0, 0.24)',
		shadowOffset: {
			width: 0,
			height: 3
		}
	}
});

function mapStateToProps(decks) {
	return { decks };
}

export default connect(mapStateToProps)(DeckList);
