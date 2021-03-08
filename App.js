import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';

import DeckList from './components/DeckList';
import AddDeck from './components/AddDeck';

function AppStatusBar() {
	return (
		<View style={{ height: 50 }}>
			<StatusBar translucent />
		</View>
	);
}

function DecksScreen() {
	return (
		<View style={{ flex: 1 }}>
			<DeckList />
		</View>
	);
}

function NewDeckScreen() {
	return (
		<View style={{ flex: 1 }}>
			<AddDeck />
		</View>
	);
}

const Tab = createBottomTabNavigator();

export default function App() {
	return (
		<Provider store={createStore(reducer)}>
			<NavigationContainer style={styles.container}>
				<AppStatusBar />

				<Tab.Navigator
					screenOptions={({ route }) => ({
						tabBarIcon: ({ focused, color, size }) => {
							let iconName;

							if (route.name === 'Decks') {
								iconName = focused ? 'ios-albums' : 'ios-albums-outline';
							} else if (route.name === 'Add Deck') {
								iconName = focused ? 'ios-add-circle' : 'ios-add-circle-outline';
							}

							return <Ionicons name={iconName} size={size} color={color} />;
						}
					})}
					tabBarOptions={{
						activeTintColor: 'tomato',
						inactiveTintColor: 'gray'
					}}
				>
					<Tab.Screen name="Decks" component={DecksScreen} />
					<Tab.Screen name="Add Deck" component={NewDeckScreen} />
				</Tab.Navigator>
			</NavigationContainer>
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
