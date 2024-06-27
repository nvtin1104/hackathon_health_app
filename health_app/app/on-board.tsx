import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colorTheme } from '@/utils/colors';
import { router } from 'expo-router';
interface OnBoardingScreenProps {
  setisFirst: React.Dispatch<React.SetStateAction<boolean>>;
}
interface OnboardingItem {
  url: number;
  title: string;
  subtitle: string;
}
const OnBoardingScreen = () => {
  const handleSkip = async () => {
    await AsyncStorage.setItem('firstLogin', 'true');
    router.push('/sign-in');
  };
  const DoneButtonComponent = () => {
    return (
      <TouchableOpacity
        onPress={handleSkip}
        style={styles.button}
      >
        <View>
          <Text style={{ fontSize: 16, color: '#fff' }}>Khám phá ngay</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const data: OnboardingItem[] = [
    {
      url: require('../assets/images/kl1.png'),
      title: 'Theo Dõi Sức Mạnh',
      subtitle:
        'Ghi lại các bài tập, theo dõi tiến độ và tối ưu hóa hiệu suất tập luyện của bạn',
    },
    {
      url: require('../assets/images/kl2.png'),
      title: 'Chinh Phục Mọi Cung Đường',
      subtitle:
        'Đo lường khoảng cách và calo đã đốt cháy trong mỗi buổi chạy của bạn',
    },
    {
      url: require('../assets/images/kl3.png'),
      title: 'Cân Bằng Cuộc Sống',
      subtitle:
        'Lên lịch các buổi tập yoga, theo dõi thời gian thực hành và cải thiện sự linh hoạt của bạn',
    },
  ];

  return (
    <View style={styles.home}>
      <Onboarding
        onSkip={() => handleSkip()}
        skipLabel={'Bỏ qua'}
        nextLabel={'Xem tiếp'}
        onDone={handleSkip}
        DoneButtonComponent={DoneButtonComponent}
        bottomBarHeight={60}
        // bottomBarColor={colorTheme.background.secondary}
        pages={data.map((item) => ({
          backgroundColor: colorTheme.background.secondary,
          image: <Image source={item.url} style={styles.img} />,
          title: item.title,
          subtitle: item.subtitle,
        }))}
      />
    </View>
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
  home: {
    height: Dimensions.get('window').height,
    backgroundColor: colorTheme.white,
  },
  img: {
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.4,
  },
  button: {
    backgroundColor: colorTheme.background.primary,
    padding: 10,
    // borderRadius: 10\
    width:Dimensions.get('window').width, 
    alignItems: 'center',
  }
});
