import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  Button,
  Alert,
  ToastAndroid,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { colorTheme } from '@/utils/colors';
import { request } from '@/utils/request';
import { useSession } from '@/auth/ctx';
import { router } from 'expo-router';
import { showToast } from '@/utils/toast';
import OnBoardingScreen from './OnBoardingScreen';
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignIn() {
  const { signIn } = useSession();
  const [password, onChangePassword] = useState('');
  const [email, onChangeText] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleLogin = () => {
    console.log(apiUrl);
    fetch(`${apiUrl}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
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
          const data = JSON.parse(text); // Attempt to parse the response as JSON
          if (data.error) {
            Alert.alert('Error', data.error);
          } else {
            console.log(data);

            if (data.success == true) {
              router.replace('/');
              //   showToast(data.message);
              signIn(data.userData);
              //   router.replace('/');
            } else {
              showToast(data.message);
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

  type Errors = {
    email?: string;
    password?: string;
  };
  const [errors, setErrors] = useState<Errors>({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [email, password]);

  const validateForm = () => {
    let errors: Errors = {};

    // Validate email field
    if (!email) {
      errors.email = 'Email là bắt buộc.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email không hợp lệ.';
    }

    // Validate password field
    if (!password) {
      errors.password = 'Mật khẩu là bắt buộc.';
    } else if (password.length < 3) {
      errors.password = 'Mật khẩu phải có ít nhất 3 ký tự.';
    }

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const [isFirst, setisFirst] = useState(true);
  useEffect(() => {
    const checkFirstLogin = async () => {
      try {
        const test = await AsyncStorage.getItem('firstLogin');
        if (test) {
          setisFirst(false);
          return;
        }
        console.log('ng');
      } catch (error) {
        console.error('Error checking first login:', error);
      }
    };
    checkFirstLogin();
  }, [isFirst]);

  return (
    <>
      {isFirst && <OnBoardingScreen setisFirst={setisFirst} />}
      {!isFirst && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colorTheme.background.secondary,
          }}
        >
          <SafeAreaView>
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              placeholder="Tên đăng nhập"
              value={email}
            />
            {errors.email && <Text style={styles.error}>{errors.email}</Text>}
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                onChangeText={onChangePassword}
                value={password}
                placeholder="Mật khẩu"
                secureTextEntry={secureTextEntry}
              />
              <TouchableOpacity
                style={styles.toggleButton}
                onPress={() => setSecureTextEntry(!secureTextEntry)}
              >
                <Text>{secureTextEntry ? 'Hiện' : 'Ẩn'}</Text>
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}
            <TouchableOpacity
              style={[styles.button, { opacity: isFormValid ? 1 : 0.5 }]}
              disabled={!isFormValid}
              onPress={handleLogin}
            >
              <Text style={styles.textButton}>Đăng nhập</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    margin: 12,
    borderWidth: 2,
    borderRadius: 36,
    paddingVertical: 12,
    width: 300,
    borderColor: colorTheme.background.primary,
    paddingHorizontal: 24,
    backgroundColor: colorTheme.white,
  },
  button: {
    backgroundColor: colorTheme.background.primary,
    padding: 16,
    borderRadius: 36,
    margin: 12,
    textAlign: 'center',
    alignItems: 'center',
  },
  textButton: {
    color: colorTheme.white,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 12,
    borderWidth: 2,
    borderRadius: 36,
    borderColor: colorTheme.background.primary,
    backgroundColor: colorTheme.white,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  error: {
    color: colorTheme.lightRed,
    marginLeft: 12,
  },
  toggleButton: {
    padding: 12,
  },
});
