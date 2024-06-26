import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text } from 'react-native';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;
export default function TermsAndServicesScreen() {
	return (
		<ThemedView style={styles.container}>
			<Text>Điều khoản và dịch vụ</Text>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 12,
	},
});
