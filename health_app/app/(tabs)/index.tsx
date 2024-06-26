import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	Image,
	StyleSheet,
	Alert,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { Link, router } from 'expo-router';
import { ExpoRouter } from 'expo-router/types/expo-router';

export default function HomeScreen() {
	const [water, setWater] = useState({});
	useEffect(() => {
		const fecthData = async () => {
			const local = await SecureStore.getItemAsync('water');
			if (local) {
				const data = JSON.parse(local);
				setWater(data);
			}
		};
		fecthData();
	}, [water]);
	const handleMeasureNowPress = () => {
		Alert.alert('Đo Ngay', 'Bạn đã nhấn Đo Ngay!');
	};

	const handleHistoryPress = () => {
		Alert.alert('Lịch Sử', 'Bạn đã nhấn Lịch Sử!');
	};

	const handleNavigate = (location: ExpoRouter.Href) => {
		router.push(location);
	};

	return (
		<ScrollView style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerText}>Trang chủ</Text>
				<View style={styles.weather}>
					<Text style={styles.weatherText}>26°C</Text>
				</View>
			</View>

			<View style={styles.card}>
				<View style={styles.header}>
					<Image
						source={{
							uri: 'https://media.istockphoto.com/id/1193452789/vector/health-or-fitness-tracker-app-on-mobile-phone-vector-flat-cartoon-smartphone-steps-or-run.jpg?s=612x612&w=0&k=20&c=3Y5z0oOT0gheYlyHn6b9BHg9zcAgqrAp5wputLPzZG8=',
						}}
						style={styles.icon}
					/>
					<TouchableOpacity
						style={styles.measureButton}
						onPress={handleMeasureNowPress}
					>
						<Text style={styles.measureButtonText}>Đo ngay →</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.footer}>
					<Text style={styles.lastReportText}>
						Báo cáo cuối cùng: 17 Tháng 6, 2024
					</Text>
					<TouchableOpacity onPress={handleHistoryPress}>
						<Text style={styles.historyText}>Lịch sử</Text>
					</TouchableOpacity>
				</View>
			</View>

			<Text style={styles.sectionTitle}>Nhật ký sức khỏe</Text>

			<View style={styles.grid}>
				<View style={styles.gridItem}>
					<TouchableOpacity onPress={() => handleNavigate('step-counter')}>
						<Image
							source={{
								uri: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTU16X4WszbGrKmYCnY0j9hOu3kfL4q-G1nD6NqoOSlPQmgn_Ky',
							}}
							style={styles.gridImage}
						/>
						<Text style={styles.gridTitle}>Đếm bước</Text>
						<Text style={styles.gridValue}>0/6000</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.gridItem}>
					<TouchableOpacity onPress={() => handleNavigate('weight-bmi')}>
						<Image
							source={{
								uri: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ41vD7gYu6LC6Tx3RUGFvdknXV-2AbN_UaLxOrL-Lhhpk2LcnC',
							}}
							style={styles.gridImage}
						/>
						<Text style={styles.gridTitle}>Cân nặng & BMI</Text>
						<Text style={styles.gridValue}>-- KG</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.gridItem}>
					<TouchableOpacity onPress={() => handleNavigate('water-reminder')}>
						<Image
							source={{
								uri: 'https://play-lh.googleusercontent.com/o1EimUcLmc9bfIHMZSifKrzorD24t6zfRHoqRijZRX3tyQdFiktMKN2qSqGUl9U3usE',
							}}
							style={styles.gridImage}
						/>
						<Text style={styles.gridTitle}>Nhắc nhở uống nước</Text>
						<Text style={styles.gridValue}>{water.tagert ? `${water.totalDrink}/${water.tagert} ml` : '0/2000 ml'}</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.gridItem}>
					<TouchableOpacity onPress={() => handleNavigate('doctor')}>
						<Image
							resizeMode="cover"
							source={{
								uri: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcToYUSvmTkRAvP7ZJ3eT9f4FaiJIgJnTqAwuaB2PZrIPLA4iawC',
							}}
							style={styles.gridImage}
						/>
						<Text style={styles.gridTitle}>Bác sĩ AI</Text>
						<Text style={styles.gridValue}>Hỏi bất kỳ bác sĩ nào</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5F5F5',
		padding: 16,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 16,
	},
	headerText: {
		fontSize: 24,
		fontWeight: 'bold',
	},
	weather: {
		backgroundColor: '#E0F7FA',
		borderRadius: 16,
		padding: 8,
	},
	weatherText: {
		fontSize: 16,
		color: '#00796B',
	},
	card: {
		backgroundColor: '#C8E6C9',
		borderRadius: 16,
		padding: 16,
		marginBottom: 16,
	},
	cardImage: {
		width: 50,
		height: 50,
		marginBottom: 16,
	},
	measureButton: {
		backgroundColor: '#388E3C',
		borderRadius: 16,
		padding: 8,
		marginBottom: 8,
	},
	measureButtonText: {
		color: '#FFFFFF',
		textAlign: 'center',
	},
	lastReportText: {
		fontSize: 14,
		color: '#757575',
		marginBottom: 8,
	},
	historyText: {
		color: '#388E3C',
		textAlign: 'right',
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 16,
	},
	grid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
	},
	gridItem: {
		backgroundColor: '#FFFFFF',
		borderRadius: 16,
		padding: 16,
		width: '48%',
		marginBottom: 16,
		alignItems: 'center',
	},
	gridImage: {
		width: 100,
		height: 100,
		resizeMode: 'cover',
	},
	gridTitle: {
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 4,
	},
	gridValue: {
		fontSize: 14,
		color: '#757575',
	},
	footer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		paddingVertical: 16,
		borderTopWidth: 1,
		borderTopColor: '#E0E0E0',
	},
	footerButton: {
		alignItems: 'center',
	},
	footerButtonText: {
		fontSize: 14,
		color: '#757575',
	},
	icon: {
		width: 100,
		height: 100,
		marginRight: 16,
		resizeMode: 'cover',
		borderRadius: 20,
	},
});
