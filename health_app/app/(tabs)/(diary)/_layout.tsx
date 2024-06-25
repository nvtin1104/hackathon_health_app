import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import 'react-native-reanimated';
import {Link} from 'expo-router';
import {Text} from 'react-native';
import React from 'react';
import {Ionicons} from '@expo/vector-icons';
import {useColorScheme} from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function DiaryLayout() {
    return (
        <Stack>
            <Stack.Screen name="step-counter"
                          options={{
                              headerTitle: 'Bước chân',
                              headerLeft: () => (
                                  <Link href="/">
                                      <Text>
                                          <Ionicons name="arrow-back-sharp" size={24} color="black"/>
                                      </Text>
                                  </Link>
                              )
                          }}
            >
            </Stack.Screen>
            <Stack.Screen name="doctor"
                          options={{
                              headerTitle: 'Bác sĩ',
                              headerLeft: () => (
                                  <Link href="/">
                                      <Text>
                                          <Ionicons name="arrow-back-sharp" size={24} color="black"/>
                                      </Text>
                                  </Link>
                              )
                          }}
            >
            </Stack.Screen>
            <Stack.Screen name="chat"
                          options={{headerTitle: 'Chat',
                              headerLeft: () => (
                                  <Link href="doctor">
                                      <Text>
                                          <Ionicons name="arrow-back-sharp" size={24} color="black" />
                                      </Text>
                                  </Link>
                              )
                          }}
            >
            </Stack.Screen>
            <Stack.Screen name="weight-bmi"
                          options={{
                              headerTitle: 'Cân nặng & BMI',
                              headerLeft: () => (
                                  <Link href="/">
                                      <Text>
                                          <Ionicons name="arrow-back-sharp" size={24} color="black"/>
                                      </Text>
                                  </Link>
                              )
                          }}
            >
            </Stack.Screen>
            <Stack.Screen name="water-reminder"
                          options={{
                              headerTitle: 'Nhắc uống nước',
                              headerLeft: () => (
                                  <Link href="/">
                                      <Text>
                                          <Ionicons name="arrow-back-sharp" size={24} color="black"/>
                                      </Text>
                                  </Link>
                              )
                          }}
            >
            </Stack.Screen>
        </Stack>
    );
}