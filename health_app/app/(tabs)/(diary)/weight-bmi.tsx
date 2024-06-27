import React, { useEffect, useState } from 'react';
import {
	Button,
	Dimensions,
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	Alert,
	Modal,
	Pressable,
	TextInput,
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { showToast } from '@/utils/toast';
import { useSession } from '@/auth/ctx';
import FullLoading from '@/components/loading/FullLoading';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const averageBMI = (bmiArray: number[]) => {
	const sum = bmiArray.reduce((a, b) => a + b, 0);
	return (sum / bmiArray.length).toFixed(2);
};

export default function WeighBMIScreen() {
	const [modalVisible, setModalVisible] = useState(false);
	const { session } = useSession();
	const user = session ? JSON.parse(session) : null;
	const [loading, setLoading] = useState(true);
	const [weightData, setWeightData] = useState({
		dataChart: {
			datasets: [
				{
					data: [0],
					color: (opacity = 1) => `rgba(76,175,80, ${opacity})`,
					strokeWidth: 2,
				},
			],
		},
		min: 0,
		max: 0,
		avg: 0,
	});
	const [bmiData, setBmiData] = useState({
		dataChart: {
			datasets: [
				{
					data: [0],
					color: (opacity = 1) => `rgba(76,175,80, ${opacity})`,
					strokeWidth: 2,
				},
			],
		},
		min: 0,
		max: 0,
		avg: 0,
	});
	const [weight, onChangeWeight] = useState('');
	const [height, onChangeHeight] = useState('');

	const fecthData = async () => {
		try {
			const response = await fetch(`${apiUrl}/bmi/7time`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${user.token}`,
				},
			});
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const text = await response.text();
			const data = JSON.parse(text);
			if (data.error) {
				Alert.alert('Error', data.error);
			} else if (data.success) {
				setLoading(false);
				const weight = data.data.map((item: any) => item.weight);
				const bmi = data.data.map((item: any) => item.bmi);
				setWeightData({
					dataChart: {
						datasets: [
							{
								data: weight,
								color: (opacity = 1) => `rgba(76,175,80, ${opacity})`,
								strokeWidth: 2,
							},
						],
					},
					min: Math.min(...weight),
					max: Math.max(...weight),
					avg: averageBMI(weight),
				});
				setBmiData({
					dataChart: {
						datasets: [
							{
								data: bmi,
								color: (opacity = 1) => `rgba(76,175,80, ${opacity})`,
								strokeWidth: 2,
							},
						],
					},
					min: Math.min(...bmi),
					max: Math.max(...bmi),
					avg: averageBMI(bmi),
				});
			} else {
				showToast('Có lỗi xảy ra, vui lòng thử lại sau');
			}
		} catch (error) {
			Alert.alert('Error', error.message);
		}
	};
	const addRecord = async (weight: number, height: number) => {
		try {
			const response = await fetch(`${apiUrl}/bmi`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${user.token}`,
				},
				body: JSON.stringify({
					weight,
					height,
				}),
			});
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const text = await response.text();
			const data = JSON.parse(text);
			if (data.error) {
				Alert.alert('Error', data.error);
			} else if (data.success) {
				setLoading(false);
				setModalVisible(false);
				showToast(`Thêm bản ghi thành công. BMI: ${data.data.bmi}. Đánh giá: ${data.data.bmiEvaluation}`);
				fecthData();
			} else {
				showToast('Có lỗi xảy ra, vui lòng thử lại sau');
			}
		} catch (error: any) {
			Alert.alert('Error', error.message);
		}
	};
	const handleSubmit = async () => {
		const result = validateInput(weight, height);
		if (result !== true) {
			showToast(result);
			return;
		}
		await addRecord(Number(weight), Number(height));

	};
	useEffect(() => {
		fecthData();
	}, []);
	const validateInput = (weight: any, height: any) => {
		const w = Number(weight);
		const h = Number(height);
		if (isNaN(w) || isNaN(h)) {
			return 'Giá trị nhập không phải là số';
		}
		if (w < 2 || w > 200) {
			return 'Cân nặng phải trong khoảng 2 đến 200 kg';
		}
		if (h < 40 || h > 300) {
			return 'Chiều cao phải trong khoảng 40 đến 300 cm';
		}
		return true;
	};
	const chartConfig = {
		backgroundGradientFrom: '#fff',
		backgroundGradientFromOpacity: 0,
		backgroundGradientTo: '#fff',
		backgroundGradientToOpacity: 0.5,
		color: (opacity = 1) => `rgba(126, 126, 126, ${opacity})`,
		strokeWidth: 2,
		barPercentage: 0.5,
		useShadowColorFromDataset: false,
	};

	return (
		<>
			{loading ? (
				<FullLoading />
			) : (
				<ScrollView style={styles.container}>
					<Pressable
						style={styles.addButton}
						onPress={() => setModalVisible(true)}
					>
						<Text style={styles.addButtonText}>+ Thêm bản ghi</Text>
					</Pressable>
					<View style={styles.card}>
						<Text style={styles.cardTitle}>Cân nặng</Text>
						<Text style={styles.unit}>Đơn vị: kg</Text>
						<View style={styles.stats}>
							<View style={styles.stat}>
								<Text style={styles.statLabel}>Tối đa</Text>
								<Text style={styles.statValue}>{weightData.max}</Text>
							</View>
							<View style={styles.stat}>
								<Text style={styles.statLabel}>Tối thiểu</Text>
								<Text style={styles.statValue}>{weightData.min}</Text>
							</View>
							<View style={styles.stat}>
								<Text style={styles.statLabel}>Trung bình</Text>
								<Text style={styles.statValue}>{weightData.avg}</Text>
							</View>
						</View>
						<View style={styles.chart}>
							<BarChart
								data={weightData.dataChart}
								width={Dimensions.get('window').width - 40}
								height={220}
								chartConfig={chartConfig}
								fromZero
							/>
						</View>
					</View>
					<View style={styles.card}>
						<Text style={styles.cardTitle}>BMI</Text>
						<View style={styles.stats}>
							<View style={styles.stat}>
								<Text style={styles.statLabel}>Tối đa</Text>
								<Text style={styles.statValue}>{bmiData.max}</Text>
							</View>
							<View style={styles.stat}>
								<Text style={styles.statLabel}>Tối thiểu</Text>
								<Text style={styles.statValue}>{bmiData.min}</Text>
							</View>
							<View style={styles.stat}>
								<Text style={styles.statLabel}>Trung bình</Text>
								<Text style={styles.statValue}>{bmiData.avg}</Text>
							</View>
						</View>
						<View style={styles.chart}>
							<BarChart
								data={bmiData.dataChart}
								width={Dimensions.get('window').width - 40}
								height={220}
								chartConfig={chartConfig}
								fromZero
							/>
						</View>
						<Modal
							animationType="fade"
							transparent={true}
							visible={modalVisible}
							onRequestClose={() => {
								setModalVisible(!modalVisible);
							}}
						>
							<View style={styles.centeredView}>
								<View style={styles.modalView}>
									<Text style={styles.modalText}>Thêm bản ghi BMI!</Text>
									<View style={styles.inputContainer}>
										<Text style={styles.inputText}>Cân nặng:</Text>
										<TextInput
											style={styles.input}
											onChangeText={onChangeWeight}
											value={weight}
											placeholder="Cân nặng"
											keyboardType="numeric"
										/>
									</View>
									<View style={styles.inputContainer}>
										<Text style={styles.inputText}>Chiều cao:</Text>
										<TextInput
											style={styles.input}
											onChangeText={onChangeHeight}
											value={height}
											placeholder="Chiều cao"
											keyboardType="numeric"
										/>
									</View>
									<Pressable style={styles.button} onPress={handleSubmit}>
										<Text style={styles.textStyle}>Lưu</Text>
									</Pressable>
								</View>
							</View>
						</Modal>
					</View>
				</ScrollView>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#E5E5E5',
	},
	card: {
		backgroundColor: '#FFF',
		margin: 16,
		borderRadius: 8,
		padding: 16,
	},
	cardTitle: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	unit: {
		alignSelf: 'flex-end',
		fontSize: 14,
		color: '#555',
	},
	stats: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginVertical: 16,
	},
	stat: {
		alignItems: 'center',
	},
	statLabel: {
		fontSize: 14,
		color: '#555',
	},
	statValue: {
		fontSize: 24,
		fontWeight: 'bold',
	},
	chart: {
		alignItems: 'center',
		marginVertical: 16,
	},
	addButton: {
		backgroundColor: '#4CAF50',
		margin: 16,
		borderRadius: 8,
		padding: 16,
		alignItems: 'center',
	},
	addButtonText: {
		color: '#FFF',
		fontSize: 18,
		fontWeight: 'bold',
	},
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
	modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	inputContainer: {
		marginVertical: 8,
	},
	inputText: {
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 8,
	},
	input: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		width: 240,
		borderRadius: 24,
		borderColor: '#ccc',
		borderWidth: 2,
	},
	button: {
		backgroundColor: '#4CAF50',
		borderRadius: 20,
		marginTop: 16,
		padding: 10,
		elevation: 2,
		width: 240,
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
		fontSize: 20,
		fontWeight: 'bold',
	},
});
