import { useSession } from '@/auth/ctx';
import { Collapsible } from '@/components/Collapsible';
import { ThemedView } from '@/components/ThemedView';
import FullLoading from '@/components/loading/FullLoading';
import { showToast } from '@/utils/toast';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
	StyleSheet,
	Image,
	Alert,
	View,
	Text,
	TouchableOpacity,
	FlatList,
	VirtualizedList,
	ScrollView,
	Pressable,
} from 'react-native';
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

interface Exercise {
	title: string;
	description: string;
	note: string;
	meals: any;
}

export default function MealsIndexScreen() {
	const { session } = useSession();
	const [loading, setLoading] = useState(true);
	const [exercise, setExercise] = useState<Exercise>(null);
	const data = session ? JSON.parse(session) : null;
	const createMeal = () => {
		setLoading(true);
		fetch(`${apiUrl}/ai/mealPlan`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + data.token,
			},
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.text(); // Get the raw response text
			})
			.then((text) => {
				try {
					const data = JSON.parse(text);
					if (data.error) {
						Alert.alert('Error', data.error);
					} else {
						if (data.success == true) {
							setLoading(false);
							setExercise(data.data);
						} else {
							showToast('Có lỗi xảy ra, vui lòng thử lại sau');
						}
					}
				} catch (error) {
					Alert.alert('Error', 'Failed to parse server response');
				}
			})
			.catch((error) => {
				Alert.alert('Error', error.message);
			});
	};
	useEffect(() => {
		fetch(`${apiUrl}/mp/user`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + data.token,
			},
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json(); // Parse JSON directly
			})
			.then((data) => {
				if (data.error) {
					Alert.alert('Error', data.error);
				} else {
					if (data.success) {
						setLoading(false);
						setExercise(data.data);
					} else {
						showToast('Có lỗi xảy ra, vui lòng thử lại sau');
					}
				}
			})
			.catch((error) => {
				Alert.alert('Error', error.message);
			});
	}, [session]);
	return (
		<ScrollView style={styles.container}>
			{loading ? (
				<FullLoading />
			) : exercise ? (
				<View>
					<View style={styles.header}>
						<Text style={styles.title}>Thực đơn hôm nay:</Text>
						<TouchableOpacity style={[styles.button]} onPress={createMeal}>
							<Text style={styles.textButton}>Tạo</Text>
						</TouchableOpacity>
					</View>

					<View style={{ paddingVertical: 16 }}>
						<Collapsible title="Bữa sáng">
							{exercise.meals?.breakfast.map((item: any) => (
								<View style={styles.foodContainer} key={item.name}>
									<Text style={styles.itemFood}>
										<Text style={styles.titleFood}>Tên:</Text> {item.name}
									</Text>
									<Text style={styles.itemFood}>
										<Text style={styles.titleFood}>Dinh dưỡng:</Text>{' '}
										{item.nutrition}
									</Text>
									<Text style={styles.itemFood}>
										<Text style={styles.titleFood}>Số lượng: </Text> {item.qty}
									</Text>
								</View>
							))}
						</Collapsible>
						<Collapsible title="Bữa trưa">
							{exercise.meals?.lunch.map((item: any) => (
								<View style={styles.foodContainer} key={item.name}>
									<Text style={styles.itemFood}>
										<Text style={styles.titleFood}>Tên:</Text> {item.name}
									</Text>
									<Text style={styles.itemFood}>
										<Text style={styles.titleFood}>Dinh dưỡng:</Text>{' '}
										{item.nutrition}
									</Text>
									<Text style={styles.itemFood}>
										<Text style={styles.titleFood}>Số lượng: </Text> {item.qty}
									</Text>
								</View>
							))}
						</Collapsible>
						<Collapsible title="Bữa tối">
							{exercise.meals?.dinner.map((item: any) => (
								<View style={styles.foodContainer} key={item.name}>
									<Text style={styles.itemFood}>
										<Text style={styles.titleFood}>Tên:</Text> {item.name}
									</Text>
									<Text style={styles.itemFood}>
										<Text style={styles.titleFood}>Dinh dưỡng:</Text>{' '}
										{item.nutrition}
									</Text>
									<Text style={styles.itemFood}>
										<Text style={styles.titleFood}>Số lượng: </Text> {item.qty}
									</Text>
								</View>
							))}
						</Collapsible>
					</View>
				</View>
			) : (
				<View style={styles.notFoundContainer}>
					<Text style={styles.notFoundText}>Không có dữ liệu</Text>
					<TouchableOpacity style={[styles.button]} onPress={createMeal}>
						<Text style={styles.textButton}>Tạo thực đơn mới</Text>
					</TouchableOpacity>
				</View>
			)}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	header: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	container: {
		flex: 1,
		padding: 12,
		margin: 24,
		backgroundColor: '#fff',
		borderRadius: 12,
	},
	title: {
		fontSize: 18,
		marginVertical: 12,
		fontWeight: '600',
	},
	description: {},
	foodContainer: {
		backgroundColor: '#C8E6C9',
		marginVertical: 8,
		padding: 12,
		borderRadius: 12,
		display: 'flex',
	},

	itemFood: {
		marginLeft: 12,
		fontSize: 16,
	},
	titleFood: {
		fontWeight: '600',
		marginLeft: 12,
		fontSize: 16,
	},
	item: {
		fontWeight: '600',
		fontSize: 16,
		paddingRight: 8,
	},
	notFoundContainer: {
		flex: 1,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	notFoundText: {
		fontSize: 20,
		fontWeight: '600',
	},
	button: {
		marginTop: 12,
		backgroundColor: '#4CAF50',
		padding: 12,
		borderRadius: 12,
	},
	textButton: {
		color: '#fff',
	},
});
