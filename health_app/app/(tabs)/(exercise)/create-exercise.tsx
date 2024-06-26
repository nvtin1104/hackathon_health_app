import { useSession } from '@/auth/ctx';
import { ThemedView } from '@/components/ThemedView';
import FullLoading from '@/components/loading/FullLoading';
import { colorTheme } from '@/utils/colors';
import { showToast } from '@/utils/toast';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
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
	TextInput,
	ScrollView,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
type Errors = {
	goal?: string;
	freetime?: string;
	time?: string;
};
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
export default function CreateExerciseScreen() {
	const { session } = useSession();
	const [loading, setLoading] = useState(false);
	const data = session ? JSON.parse(session) : null;
	const router = useRouter();
	const [goal, onChangeGoal] = useState('');
	const [time, onChangeTime] = useState('');
	const [freetime, onChangeFreetime] = useState('');
	const createExercise = () => {
		setLoading(true);
		fetch(`${apiUrl}/ai/workoutPlan`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + data.token,
			},
			body: JSON.stringify({
				goal: goal,
				freetime: freetime,
				time: time,
			}),
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
							showToast('Tạo bài tập thành công');
							setTimeout(() => {
								router.push('/exercise', { refresh: true });
							}, 1000);
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
	// validation.js
	const validateFields = (goal: any, freetime: any, time: any) => {
		const errors: Errors = {};

		if (!goal) {
			errors.goal = 'Mục tiêu không được để trống';
		}

		if (!freetime) {
			errors.freetime = 'Thời gian rảnh không được để trống';
		}
		if (0 > time || time >= 24) {
			errors.time = 'Thời gian tập luyện không hợp lệ';
		}
		if (!time) {
			errors.time = 'Thời gian tập luyện không được để trống';
		} else if (isNaN(time)) {
			errors.time = 'Thời gian tập luyện phải là số';
		}

		return errors;
	};
	const handleSubmit = () => {
		const validationErrors = validateFields(goal, freetime, time);
		if (Object.keys(validationErrors).length > 0) {
			const firstError = Object.values(validationErrors)[0];
			showToast(firstError);
		} else {
			Alert.alert(
				'Tạo bài tập',
				'Việc tạo bài tập mới sẽ xóa toàn bộ bài tập có và tiến trình. Bạn có chắc không?',
				[
					{
						text: 'Hủy',
						style: 'cancel',
					},
					{
						text: 'Có',
						onPress: () => createExercise(),
					},
				]
			);
		}
	};

	return (
		<ScrollView style={styles.container}>
			{loading ? (
				<FullLoading />
			) : (
				<View>
					<View style={styles.inputContainer}>
						<Text style={styles.label}>Mục tiêu:</Text>
						<TextInput
							style={styles.input}
							onChangeText={onChangeGoal}
							placeholder="Mục tiêu"
							value={goal}
						/>
					</View>
					<View style={styles.inputContainer}>
						<Text style={styles.label}>Thời gian rảnh (Phút):</Text>
						<TextInput
							style={styles.input}
							onChangeText={onChangeFreetime}
							placeholder="Thời gian rảnh"
							value={freetime}
						/>
					</View>
					<View style={styles.inputContainer}>
						<Text style={styles.label}>Bắt đầu tập luyện lúc(Giờ):</Text>
						<TextInput
							style={styles.input}
							onChangeText={onChangeTime}
							placeholder="Thời gian tập luyện"
							value={time}
						/>
					</View>
					<TouchableOpacity style={styles.button} onPress={handleSubmit}>
						<Text style={styles.buttonText}>Tạo</Text>
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
		backgroundColor: 'white',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
	},
	label: {
		fontSize: 16,
		fontWeight: 'bold',
		marginVertical: 12,
	},
	inputContainer: {
		display: 'flex',
		flexDirection: 'column',
	},
	input: {
		marginHorizontal: 12,
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 32,
		marginBottom: 12,
		borderColor: '#ccc',
		borderWidth: 1,
	},
	button: {
		backgroundColor: colorTheme.background.primary,
		padding: 12,
		borderRadius: 24,
		alignItems: 'center',
		margin: 12,
	},
	buttonText: {
		color: 'white',
		fontSize: 16,
	},
});
