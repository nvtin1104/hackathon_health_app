import React from 'react';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const ImgUrl = require('@/assets/images/exercise.jpg');

const exerciser = {
	title: 'Bai tap giam can co ban',
	description: 'Day la bai tap giam can co ban',
	detail: [
		{
			name: 'KhoiDong',
			active: [
				{
					name: 'Di bo hoac chay tai cho',
					time: '2 phut',
				},
				{
					name: 'Xoay khop co tay va co chan',
					time: '1 phut',
				},
				{
					name: 'Xoay khop vai',
					time: '1 phut',
				},
				{
					name: 'Xoay khop hong',
					time: '1 phut',
				},
			],
		},
		{
			name: 'BaiTapChinh',
			active: [
				{
					name: 'Squats',
					time: '3 phut/ 15lan',
				},
				{
					name: 'Lunges',
					time: '3 phut/ 15lan',
				},
				{
					name: 'Push-ups',
					time: '3 phut/ 15lan',
				},
				{
					name: 'Mountain Climbers',
					time: '3 phut/ 15lan',
				},
				{
					name: 'Plank',
					time: '3 phut/ 15lan',
				},
			],
		},
		{
			name: 'Ha nhiet',
			active: [
				{
					name: 'Di bo tai cho',
					time: '2 phut',
				},
				{
					name: 'Duoi co',
					time: '3 phut',
				},
			],
		},
	],
	note: [
		{
			name: 'Che do an uong',
			description:
				'Ket hop bai tap voi che do an uong lanh manh, giam thieu duong, tinh bot tinh che va chat beo khong lanh manh.',
		},
		{
			name: 'Uong du nuoc',
			description: 'Uong it nhat 2 lit nuoc moi ngay de co the hoat dong tot.',
		},
		{
			name: 'Ngu du giac',
			description:
				'Ngu it nhat 7-8 gio moi dem de co the hoi phuc va duy tri suc khoe.',
		},
	],
};

type detailExerciseItem = {
	name: string;
	active: Array<{
		name: string;
		time: string;
	}>;
};

type detailExercise = Array<detailExerciseItem>;

export default function DetailsExerciseScreen() {
	const { id } = useLocalSearchParams();

	const renderExercise = (exerciserDetail: detailExercise) => {
		return exerciserDetail.map((item: detailExerciseItem, index: number) => (
			<Collapsible key={index} title={item.name}>
				{item.active.map((activity, idx) => (
					<View key={idx} style={styles.activityItem}>
						<Text style={styles.activityName}>- {activity.name}</Text>
						<Text style={styles.activityTime}>- {activity.time}</Text>
					</View>
				))}
			</Collapsible>
		));
	};

	return (
		<ThemedView style={styles.container}>
			<ScrollView>
				<Text style={styles.title}>{exerciser.title}</Text>
				<Image source={ImgUrl} style={styles.thumbnail} />
				<Text style={styles.description}>{exerciser.description}</Text>
				<Text style={styles.detail}>Bài tập:</Text>
				{renderExercise(exerciser.detail)}
				<Text style={styles.noteTitle}>Lưu ý:</Text>
				{exerciser.note.map((noteItem, index) => (
					<View key={index} style={styles.noteItem}>
						<Text style={styles.noteName}>{noteItem.name}</Text>
						<Text style={styles.noteDescription}>{noteItem.description}</Text>
					</View>
				))}
			</ScrollView>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 12,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 12,
	},
	thumbnail: {
		width: '100%',
		height: 200,
		marginBottom: 12,
		marginTop: 12,
	},
	description: {
		fontSize: 16,
	},
	detail: {
		fontSize: 20,
		fontWeight: 'bold',
		marginTop: 12,
		marginBottom: 12,
	},
	activityItem: {
		marginBottom: 8,
	},
	activityName: {
		fontSize: 16,
		fontWeight: 'bold'
	},
	activityTime: {
		fontSize: 16,
	},
	noteTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		marginTop: 12,
		marginBottom: 12,
	},
	noteItem: {
		marginBottom: 12,
	},
	noteName: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	noteDescription: {
		fontSize: 16,
	},
});
