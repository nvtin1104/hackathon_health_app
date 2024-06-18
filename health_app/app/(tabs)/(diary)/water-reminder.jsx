import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';

export default function WaterReminderScreen() {
	return (
		<ThemedView style={styles.titleContainer}>
			<ThemedText type="title">
				<Link href="home">WaterReminderScreen</Link>
			</ThemedText>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	titleContainer: {
		flex: 1,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
