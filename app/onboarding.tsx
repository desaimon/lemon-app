// app/onboarding.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, ActivityIndicator, TouchableOpacity} from 'react-native';
import * as Font from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const OnboardingScreen = () => {
  const router = useRouter();
  
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const lastName = '';
  const phoneNumber = ''; 
  const imageUri = '';
  const [isValidName, setIsValidName] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);  

 


  const validateName = (name: string) => {
    setFirstName(name);
    if (name.length === 0) {
      setIsValidName(false);
      return;
    }
    const nameRegex = /^[a-zA-Z]+$/;
    setIsValidName(nameRegex.test(name));    
  };

  const validateEmail = (email: string) => {
    setEmail(email);
    if (email.length === 0) {
      setIsValidEmail(false);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(email));
  };


  const completeOnboarding = async () => {
    try {      
      await AsyncStorage.setItem('userData',JSON.stringify({firstName, email, lastName, phoneNumber, imageUri}))
      await AsyncStorage.setItem('@onboardingComplete', 'true');   
      router.replace('./(drawer)/profile'); 
    } catch(error) {
      console.log('onboarding issue', error);
    }
  };

  const loadFonts = async () => {
    await Font.loadAsync({
      'MarkaziText-Regular': require('../assets/fonts/MarkaziText-Regular.ttf'),
      'Karla-Regular': require('../assets/fonts/Karla-Regular.ttf'),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {    
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }
  
  return (
    
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logo} source={require('../assets/images/Logo.png')} />
      </View>

      <View style={styles.textInputs}>
        <Text style={styles.welcomeText}>Let us get to know you</Text>

        <Text style={styles.text}>First Name</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={validateName}
        />

        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={validateEmail}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.button,
            (!isValidName || !isValidEmail) ? styles.buttonDisabled : styles.buttonEnabled,
          ]}
          disabled={!isValidName || !isValidEmail}
          onPress={completeOnboarding}
        >
          <Text
            style={
              (!isValidName || !isValidEmail) ? styles.buttonTextDisabled : styles.buttonTextEnabled
            }
          >
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    width: '100%',
  },
  logo: {    
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d3d3d3',
  },
  textInputs: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 1,
    marginBottom: 10,
    fontFamily: 'Karla-Regular', 
    padding: 10,
  },
  text: {
    fontFamily: 'MarkaziText-Regular', 
    fontSize: 22,
    color: '#37474F',
  },
  welcomeText: {
    fontFamily: 'MarkaziText-Regular', 
    fontSize: 35,
    color: '#37474F',
    flex: 0.8,
  },
  footer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e9e9e9',
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },  
  button: {
    width: '40%',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonEnabled: {
    backgroundColor: '#9f9a9a', 
  },
  buttonDisabled: {
    backgroundColor: '#e3dbdb', 
  },
  buttonTextEnabled: {
    color: 'black', 
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonTextDisabled: {
    color: '#d0cccc', 
    fontSize: 18,
    fontWeight: 'bold',
  },
});
