import { ThemedView } from '@/components/ThemedView';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
	StyleSheet,
	Image,
	Alert,
	View,
	Text,
	TouchableOpacity,
	FlatList,
	VirtualizedList,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
type ItemData = {
	id: string;
	title: string;
};
type ItemDataList = {
	id: string;
	title: string;
	uri: string;
};
const DATA: ItemData[] = [
	{
		id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
		title: 'Hoàn thành',
	},
	{
		id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
		title: 'Chưa hoàn thành',
	},
];
export default function CreateExerciseScreen() {
	const [selectedId, setSelectedId] = useState<string>();
	const handlePress = () => {
		router.push('detail-exercise/1');
	};

	return <ThemedView style={styles.container}></ThemedView>;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 12,
	},
	content: {
		backgroundColor: '#F5F5F5',
	},
	item: {
		padding: 8,
		borderRadius: 8,
		marginVertical: 4,
		marginHorizontal: 8,
	},
	title: {
		fontSize: 12,
	},
	itemExercise: {
		backgroundColor: '#C8E6C9',
		marginVertical: 8,
		marginHorizontal: 16,
		padding: 12,
		borderRadius: 12,
		display: 'flex',
		flexDirection: 'row',
	},
	itemExerciseImg: {
		width: 80,
		height: 80,
		borderRadius: 8,
	},
	itemExerciseText: {
		marginLeft: 12,
		fontSize: 16,
	},
});
