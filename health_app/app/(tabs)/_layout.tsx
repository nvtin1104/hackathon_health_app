import { Stack, Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name="home"
				options={{
					title: 'Trang chủ',
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? 'home' : 'home-outline'}
							color={color}
						/>
					),
				}}
			/>

			<Tabs.Screen
				name="(diary)"
				options={{
					href: null,
				}}
			/>
			<Tabs.Screen
				name="(exercise)"
				options={{
					title: 'Bài tập',
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? 'calendar' : 'calendar-outline'}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="(user)"
				options={{
					title: 'Cá nhân',
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? 'person' : 'person-outline'}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
