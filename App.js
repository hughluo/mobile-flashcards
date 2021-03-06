import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import middleware from './middleware';
import { setLocalNotification } from './utils/helpers';

import { NavigationContainer } from '@react-navigation/native';
import Navigator from './components/Navigator';

function AppStatusBar() {
	return (
		<View style={{ height: 50 }}>
			<StatusBar translucent />
		</View>
	);
}

export default function App() {
	React.useEffect(() => {
		setLocalNotification();
	}, []);
	return (
		<Provider store={createStore(reducer, middleware)}>
			<NavigationContainer style={styles.container}>
				<AppStatusBar />
				<Navigator />
			</NavigationContainer>
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
