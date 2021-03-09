import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View } from 'react-native';

import DeckList from './DeckList';
import AddDeck from './AddDeck';
import DeckDetail from './DeckDetail';

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
function TabNavigator() {
	return (
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
	);
}

const Stack = createStackNavigator();

function Navigator() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Home" component={TabNavigator} />
			<Stack.Screen name="Deck Detail" component={DeckDetail} />
		</Stack.Navigator>
	);
}

export default Navigator;
