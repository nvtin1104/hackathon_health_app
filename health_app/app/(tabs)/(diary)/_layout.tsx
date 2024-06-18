import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function DiaryLayout() {
	return (
		<Stack>
			<Stack.Screen name="step-counter" />
			<Stack.Screen name="doctor" />
			<Stack.Screen name="weight-bmi" />
			<Stack.Screen name="water-reminder" />
		</Stack>
	);
}
