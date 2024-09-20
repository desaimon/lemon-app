import React, { useEffect } from 'react';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const SplashScreen = () => {
  const router = useRouter();

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const onboardingComplete = await AsyncStorage.getItem('@onboardingComplete');
        console.log(onboardingComplete);
        if (onboardingComplete === 'true') {
          router.replace('./(drawer)/profile');
        } else {
          console.log('gotoonboarding');
          router.replace('./onboarding');
        }
      } catch (error) {
        console.log('Error checking onboarding status:', error);
        router.replace('./onboarding');
      }
    };
    checkOnboarding();
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/images/Logo.png')} />
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#495E57',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
});