import { useSession } from '@/auth/ctx';
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
import { SafeAreaView } from 'react-native-safe-area-context';

interface Exercise {
	title: string;
	description: string;
	note: string;
	exercises: any;
}

export default function ExerciseIndexScreen() {
	const { session } = useSession();
	const [loading, setLoading] = useState(true);
	const [exercise, setExercise] = useState<Exercise>({
		title: '',
		description: '',
		note: '',
		exercises: [],
	});
	const data = session ? JSON.parse(session) : null;
	useEffect(() => {
		fetch(`${apiUrl}/wp/user`, {
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
	}, []);
	return (
		<ScrollView style={styles.container}>
			{loading ? (
				<FullLoading />
			) : exercise ? (
				<View>
					<Text style={styles.title}>
						<Text style={{ fontWeight: '600' }}>Tên bài tập:</Text>{' '}
						{exercise.title ? exercise.title : 'Bài tập không có tên'}
					</Text>
					<Text style={styles.description}>Mô tả:{exercise.description}</Text>
					<Text>
						<Text style={{ fontWeight: '600' }}>Chú ý: </Text>
						{exercise.note}
					</Text>
					<View>
						<Text style={{ fontWeight: '600', fontSize: 18 }}>
							Các bài tập:
						</Text>
						{exercise.exercises.map((item: any, index: number) => (
							<View style={styles.itemExercise} key={index}>
								<View>
									<Text style={styles.itemExerciseText}>
										<Text style={styles.item}>Tên bài tập:</Text>
										{item.name}
									</Text>
									<Text style={styles.itemExerciseText}>
										<Text style={styles.item}>Thời gian:</Text>
										{item.time}
									</Text>
									<Text style={styles.itemExerciseText}>
										<Text style={styles.item}>Luyện tập:</Text>
										{item.practice}
									</Text>
									<Text style={styles.itemExerciseText}>
										<Text style={styles.item}>Chú ý:</Text>
										{item.note}
									</Text>
								</View>
							</View>
						))}
					</View>
				</View>
			) : (
				<View style={styles.notFoundContainer}>
					<Text style={styles.notFoundText}>Không có dữ liệu</Text>
					<TouchableOpacity
						style={[styles.button]}
						onPress={() => router.push('/create-exercise')}
					>
						<Text style={styles.textButton}>Tạo bài tập mới</Text>
					</TouchableOpacity>
				</View>
			)}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 12,
		margin: 24,
		backgroundColor: '#fff',
		borderRadius: 12,
	},
	title: {
		fontSize: 20,
		marginVertical: 12,
	},
	description: {},
	itemExercise: {
		backgroundColor: '#C8E6C9',
		marginVertical: 8,
		padding: 12,
		borderRadius: 12,
		display: 'flex',
		flexDirection: 'row',
	},

	itemExerciseText: {
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
