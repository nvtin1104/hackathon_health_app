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
const getItem = (_data: unknown, index: number): ItemDataList => ({
	id: Math.random().toString(12).substring(0),
	uri: 'asset:/images/exercise.jpg',
	title: `Item ${index + 1}`,
});

const getItemCount = (_data: unknown) => 50;
const ImgUrl = require('../../../assets/images/exercise.jpg');
type ItemPropsList = {
	title: string;
	uri: string;
	onPress: () => void;
};
type ItemProps = {
	item: ItemData;
	onPress: () => void;
	backgroundColor: string;
	textColor: string;
};
const Item = ({ item, onPress, backgroundColor, textColor }: ItemProps) => (
	<TouchableOpacity
		onPress={onPress}
		style={[styles.item, { backgroundColor }]}
	>
		<Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
	</TouchableOpacity>
);
const ItemList = ({ title, uri, onPress }: ItemPropsList) => (
	<TouchableOpacity onPress={onPress} style={styles.itemExercise}>
		<Image source={ImgUrl} style={styles.itemExerciseImg} />
		<Text style={styles.itemExerciseText}>{title}</Text>
	</TouchableOpacity>
);
export default function ExerciseIndexScreen() {
	const [selectedId, setSelectedId] = useState<string>();
	const handlePress = () => {
		router.push('detail-exercise/1');
	};
	const renderItem = ({ item }: { item: ItemData }) => {
		const backgroundColor = item.id === selectedId ? '#388E3C' : '#C8E6C9';
		const color = item.id === selectedId ? 'white' : 'black';

		return (
			<Item
				item={item}
				onPress={() => setSelectedId(item.id)}
				backgroundColor={backgroundColor}
				textColor={color}
			/>
		);
	};
	return (
		<ThemedView style={styles.container}>
			<View>
				<FlatList
					horizontal={true}
					data={DATA}
					renderItem={renderItem}
					keyExtractor={(item) => item.id}
					extraData={selectedId}
				/>
			</View>
			<View>
				<VirtualizedList
					initialNumToRender={4}
					renderItem={({ item }) => (
						<ItemList title={item.title} uri={item.uri} onPress={handlePress} />
					)}
					keyExtractor={(item) => item.id}
					getItemCount={getItemCount}
					getItem={getItem}
				/>
			</View>
		</ThemedView>
	);
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
