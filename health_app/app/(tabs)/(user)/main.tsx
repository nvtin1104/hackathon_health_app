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
import { useSession } from '@/auth/ctx';
import { useStorageState } from '@/auth/useStorageState';
import { showToast } from '@/utils/toast';

type ItemData = {
	id: string;
	title: string;
	icon: any;
	hidden?: boolean;
};
const DATA: ItemData[] = [
	{
		id: 'profile',
		title: 'Hồ sơ',
		icon: 'person-circle-outline',
	},
	{
		id: 'parameter',
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
		id: 'tas',
		title: 'Điều khoản và dịch vụ',
		icon: 'book-outline',
	},
	{
		id: 'log-out',
		title: 'Đăng xuất',
		icon: 'exit-outline',
		hidden: true,
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
		{item.hidden !== true && (
			<FontAwesome name="chevron-right" size={16} color="black" />
		)}
	</TouchableOpacity>
);
export default function UserMainScreen() {
	const { signOut } = useSession();
	const [[isLoading, session], setSession] = useStorageState('session');
	const handlePress = (id: string) => {
		switch (id) {
			case 'log-out':
				Alert.alert('Đăng xuất', 'Bạn có chắc chắn muốn đăng xuất?', [
					{
						text: 'Hủy',
						style: 'cancel',
					},
					{
						text: 'Đăng xuất',
						onPress: () => {
							signOut();
							showToast('Đã đăng xuất khỏi hệ thống');
							router.replace('/sign-in');
						},
					},
				]);
				break;
			case 'parameter':
				router.push('/parameter');
				break;
			case 'tas':
				console.log(session);
				break;
			case 'profile':
				router.push('/profile');
				break;
			default:
				console.log('default');
				break;
		}
	};
	const renderItem = ({ item }: { item: ItemData }) => {
		return <Item item={item} onPress={() => handlePress(item.id)} />;
	};
	return (
		<ThemedView style={styles.container}>
			<View>
				<Text style={styles.title}>Tổng quan</Text>
				<FlatList
					data={DATA}
					renderItem={renderItem}
					keyExtractor={(item) => item.id}
				/>
			</View>
			<View>
				<Text style={styles.title}>Về chúng tôi</Text>
				<FlatList
					data={DATA2}
					renderItem={renderItem}
					keyExtractor={(item) => item.id}
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
