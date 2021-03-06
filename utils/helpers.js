import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';

const NOTIFICATION_KEY = 'FLASHCARDS:NOTIFICATION';

export function timeToString(time = Date.now()) {
	const date = new Date(time);
	const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
	return todayUTC.toISOString().split('T')[0];
}

export function clearLocalNotification() {
	return AsyncStorage.removeItem(NOTIFICATION_KEY).then(Notifications.cancelAllScheduledNotificationsAsync);
}

function createNotification() {
	return {
		title: 'Quiz time!',
		body: "👋 It's time to take a quiz!",
		ios: {
			sound: true
		},
		android: {
			sound: true,
			priority: 'high',
			sticky: false,
			vibrate: true
		}
	};
}

export function setLocalNotification() {
	AsyncStorage.getItem(NOTIFICATION_KEY).then(JSON.parse).then((data) => {
		if (data === null) {
			Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
				if (status === 'granted') {
					Notifications.cancelAllScheduledNotificationsAsync();

					let tomorrow = new Date();
					tomorrow.setDate(tomorrow.getDate() + 1);
					tomorrow.setHours(20);
					tomorrow.setMinutes(0);

					Notifications.scheduleLocalNotificationAsync(createNotification(), {
						time: tomorrow,
						repeat: 'day'
					});

					AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
				}
			});
		}
	});
}
