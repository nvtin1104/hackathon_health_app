import * as SecureStore from 'expo-secure-store';
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	StyleSheet,
	Modal,
	TextInput,
	ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { colorTheme } from '@/utils/colors';
import { showToast } from '@/utils/toast';

const getFormattedDate = () => {
	const date = new Date();
	const day = date.getDate();
	const month = date.getMonth() + 1; // Months are 0-indexed
	return `${day}/${month}`;
};

export default function WaterReminderScreen() {
	const [water, setWater] = useState({});
	const [modalVisible, setModalVisible] = useState(false);
	const [inputValue, setInputValue] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			const local = await SecureStore.getItemAsync('water');
			if (local) {
				const data = JSON.parse(local);
				if (data.date !== getFormattedDate()) {
					data.totalDrink = 0;
					data.quantity = 0;
					data.date = getFormattedDate();
					const dataString = JSON.stringify(data);
					await SecureStore.setItemAsync('water', dataString);
				}
				setWater(data);
			} else {
				const data = {
					tagert: 2000,
					lastDrink: '10:00',
					totalDrink: 0,
					quantity: 0,
					date: getFormattedDate(),
				};
				const dataString = JSON.stringify(data);
				await SecureStore.setItemAsync('water', dataString);
				setWater(data);
			}
		};
		fetchData();
	}, []);

	const handleSubmit = async () => {
		const result = validateInput(inputValue);
		if (result === true) {
			setModalVisible(!modalVisible);
			const reminderWater = {
				tagert: Number(inputValue),
				lastDrink: water.lastDrink,
				totalDrink: water.totalDrink,
				quantity: water.quantity,
				date: water.date,
			};
			const data = JSON.stringify(reminderWater);
			await SecureStore.setItemAsync('water', data);
			setWater(reminderWater);
		} else {
			showToast(result);
		}
	};

	const validateInput = (text: any) => {
		const value = Number(text);
		if (isNaN(value)) {
			return 'Giá trị nhập không phải là số';
		}
		if (value < 500 || value > 10000) {
			return 'Giá trị nhập phải trong khoảng 500 đến 10000';
		}
		return true;
	};
	const handleDrink = () => {
		const date = getFormattedDate();
		const newTotal = water.totalDrink + 200;
		const newQuantity = water.quantity + 1;
		const reminderWater = {
			tagert: water.tagert,
			lastDrink: date,
			totalDrink: newTotal,
			quantity: newQuantity,
			date: water.date,
		};
		const data = JSON.stringify(reminderWater);
		SecureStore.setItemAsync('water', data);
		setWater(reminderWater);
		showToast('Đã thêm 200 ml nước');
		if (newTotal >= water.tagert) {
			showToast('Chúc mừng bạn đã hoàn thành mục tiêu uống nước hôm nay');
		}
	};

	return (
		<>
			<ScrollView contentContainerStyle={styles.container}>
				<Text style={styles.waterAmount}>{water.totalDrink} ml</Text>
				<View style={styles.infoBox}>
					<View style={styles.infoRow}>
						<Text style={styles.infoText}>Mục tiêu hàng ngày:</Text>
						<Text style={styles.infoValue}>{water.tagert} ml</Text>
					</View>
					<View style={styles.infoRow}>
						<Text style={styles.infoText}>Lần uống cuối:</Text>
						<Text style={styles.infoValue}>{water.lastDrink}</Text>
					</View>
					<View style={styles.infoRow}>
						<Text style={styles.infoText}>Số lượng:</Text>
						<Text style={styles.infoValue}>{water.quantity} Cốc</Text>
					</View>
				</View>
				<View>
					<TouchableOpacity
						onPress={() => setModalVisible(true)}
						style={styles.editButton}
					>
						<Text style={styles.textEditButton}> Chỉnh sửa mục tiêu</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.plusButton}
						onPress={() => handleDrink()}
					>
						<Image
							source={{
								uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUrIYhKJ-HYV8DYjUYD7UFKFGBAAJo4QlwT0fDBKLPHA1Nxwxh',
							}}
							style={styles.addIcon}
						/>
						<Text style={styles.footerText}>200 ml</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}
			>
				<View style={styles.modalBackground}>
					<View style={styles.modalContainer}>
						<TextInput
							style={styles.input}
							onChangeText={setInputValue}
							value={inputValue}
							placeholder={'500-10000 ml/ngày'}
						/>
						<View style={styles.buttonContainer}>
							<TouchableOpacity
								style={styles.cancelButton}
								onPress={() => setModalVisible(!modalVisible)}
							>
								<Text>Hủy</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={{
									...styles.okButton,
									backgroundColor: inputValue === '' ? '#ccc' : '#4CAF50',
								}}
								onPress={() => {
									handleSubmit();
								}}
							>
								<Text style={{ color: '#fff' }}>Đồng ý</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#f0f4f8',
		alignItems: 'center',
		padding: 20,
		width: '100%',
		height: '100%',
	},
	editButton: {
		backgroundColor: colorTheme.background.primary,
		padding: 15,
		borderRadius: 24,
		marginBottom: 20,
	},
	textEditButton: {
		fontSize: 18,
		color: '#fff',
	},
	waterAmount: {
		fontSize: 48,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	infoBox: {
		width: '90%',
		backgroundColor: '#fff',
		borderRadius: 10,
		padding: 20,
		marginBottom: 20,
	},
	infoRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 10,
	},
	infoText: {
		fontSize: 18,
	},
	infoValue: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	historyButton: {
		marginTop: 10,
	},
	historyText: {
		fontSize: 18,
		color: '#007bff',
	},
	plusButton: {
		backgroundColor: '#fff',
		alignItems: 'center',
		padding: 15,
		borderRadius: 50,
		flexDirection: 'row',
		justifyContent: 'center',
	},
	addIcon: {
		width: 50,
		height: 50,
	},
	footerText: {
		fontSize: 18,
	},
	modalBackground: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	modalContainer: {
		width: 300,
		padding: 20,
		backgroundColor: 'white',
		borderRadius: 10,
		alignItems: 'center',
	},
	input: {
		width: '100%',
		height: 40,
		borderColor: '#E0E0E0',
		borderWidth: 1,
		borderRadius: 5,
		padding: 10,
		marginBottom: 20,
		textAlign: 'center',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
	},
	cancelButton: {
		flex: 1,
		marginRight: 10,
		padding: 10,
		borderColor: '#4CAF50',
		borderWidth: 1,
		borderRadius: 5,
		alignItems: 'center',
	},
	okButton: {
		flex: 1,
		marginLeft: 10,
		padding: 10,
		borderRadius: 5,
		alignItems: 'center',
	},
});
