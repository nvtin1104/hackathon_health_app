import { ThemedView } from '@/components/ThemedView';
import { Iconic } from '@/components/icon/Iconic';
import { Entypo } from '@expo/vector-icons';
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
import { FontAwesome } from '@expo/vector-icons';

type ItemData = {
	id: string;
	title: string;
	icon: any;
};
const DATA: ItemData[] = [
	{
		id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
		title: 'Hồ sơ',
		icon: 'person-circle-outline',
	},
	{
		id: 'bd7acbea-s1b1-46c2-aed5-3ad53abb28ba',
		title: 'Thông số',
		icon: 'person-outline',
	},
	{
		id: 'bd7acbea-c1da-46c2-aed5-3ad53abb28ba',
		title: 'Cài đặt',
		icon: 'settings-outline',
	},
];
const DATA2: ItemData[] = [
	{
		id: 'bd7acbea-c1b1-46c2-aed5-3ad53a4b28ba',
		title: 'Đánh giá',
		icon: 'star-outline',
	},
	{
		id: 'bd7acbea-s1b1-46c2-aed5-3ad532bb28ba',
		title: 'Phiên bản',
		icon: 'alert-circle-outline',
	},
	{
		id: 'bd7acbea-c1da-46c2-aed5-3ad533bb28ba',
		title: 'Điều khoản và dịch vụ',
		icon: 'book-outline',
	},
];

type ItemProps = {
	item: ItemData;
	onPress: () => void;
};
const Item = ({ item, onPress }: ItemProps) => (
	<TouchableOpacity onPress={onPress} style={[styles.item]}>
		<View style={styles.itemLeft}>
			<Iconic name={item.icon} style={styles.icon} />
			<Text style={[styles.label]}>{item.title}</Text>
		</View>
		<FontAwesome
			name="angle-right"
			size={24}
			color="black"
			style={styles.icon}
		/>
	</TouchableOpacity>
);
export default function UserMainScreen() {
	const [selectedId, setSelectedId] = useState<string>();
	const handlePress = () => {
		router.push('detail-exercise/1');
	};
	const renderItem = ({ item }: { item: ItemData }) => {
		return <Item item={item} onPress={() => setSelectedId(item.id)} />;
	};
	return (
		<ThemedView style={styles.container}>
			<View>
				<Text style={styles.title}>Tổng quan</Text>
				<FlatList
					data={DATA}
					renderItem={renderItem}
					keyExtractor={(item) => item.id}
					extraData={selectedId}
				/>
			</View>
			<View>
				<Text style={styles.title}>Về chúng tôi</Text>
				<FlatList
					data={DATA2}
					renderItem={renderItem}
					keyExtractor={(item) => item.id}
					extraData={selectedId}
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
	itemLeft: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	item: {
		padding: 8,
		borderRadius: 8,
		marginVertical: 4,
		marginHorizontal: 8,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: '#F5F5F5',
		fontWeight: 'bold',
	},
	title: {
		fontSize: 16,
		marginTop: 8,
		marginBottom: 8,
		fontWeight: 'semibold',
		color: '#222222',
	},
	label: {
		fontSize: 16,
		marginTop: 8,
		marginBottom: 8,
		fontWeight: 'bold',
		color: '#222222',
	},
	icon: {
		marginRight: 8,
		fontWeight: 'bold',
	},
});
