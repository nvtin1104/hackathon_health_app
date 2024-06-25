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
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

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
				name="exercise"
				options={{
					headerTitle: 'Bài tập',
					headerRight: () => (
						<TouchableOpacity
							style={styles.button}
							onPress={() => router.push('/create-exercise')}
						>
							<Text style={styles.buttonText}>Tạo bài tập</Text>
						</TouchableOpacity>
					),
				}}
			/>
			<Stack.Screen
				name="detail-exercise/[id]"
				options={{ headerTitle: 'Chi tiết bài tập' }}
			/>
			<Stack.Screen
				name="create-exercise"
				options={{ headerTitle: 'Tạo bài tập' }}
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
