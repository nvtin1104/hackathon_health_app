import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

import { colorTheme } from '@/utils/colors';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function SettingLayout() {
	const router = useRouter();
	// Hide the splash screen once the app is ready
	useEffect(() => {
		const hideSplashScreen = async () => {
			await SplashScreen.hideAsync();
		};

		hideSplashScreen();
	}, []);

	return (
		<Stack>
			<Stack.Screen
				name="meals"
				options={{
					headerTitle: 'Thực đơn',
				}}
			/>
		</Stack>
	);
}

const styles = StyleSheet.create({
	button: {
		padding: 10,
		backgroundColor: colorTheme.background.primary,
		borderRadius: 24,
	},
	buttonText: {
		color: '#fff',
	},
});
