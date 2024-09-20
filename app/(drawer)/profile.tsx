import React from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator} from 'react-native';
import { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CheckBox } from 'react-native-elements';



const ProfileScreen = () => {

  const [firstName, setFirstName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [isValidName, setIsValidName] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidLastName, setIsValidLastName] = useState(false);
  const [isValidePhoneNumber, setIsValidPhoneNumber] = useState(false); 

  const [notifications, setNotifications] = useState({
    orderStatuses: false,
    passwordChanges: false,
    specialOffers: false,
    newsletter: false,
  });

  /*const [fontsLoaded, setFontsLoaded] = useState(false);*/

  const [fontsLoaded] = useFonts({
    'Karla-Regular': require('../../assets/fonts/Karla-Regular.ttf'),
    'MarkaziText-Regular': require('../../assets/fonts/MarkaziText-Regular.ttf'),
  });

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
    setUserEmail(email);
    if (email.length === 0) {
      setIsValidEmail(false);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(email));
  };

  const validateLastName= (lastName: string) => {
    setLastName(lastName);
    if (lastName.length === 0) {
      setIsValidLastName(false);
      return;
    }
    const nameRegex = /^[a-zA-Z]+$/;
    setIsValidLastName(nameRegex.test(lastName));    
  };

  const validatePhoneNumber = (phone: string) => {
    setPhoneNumber(phone);
    if (phone.length === 0){
      setIsValidPhoneNumber(false);
      return;
    }

    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    setIsValidPhoneNumber(phoneRegex.test(phone));
  };

  const fetchUserData = async() => {
    try{
      const storedUserData = await AsyncStorage.getItem('userData');
      console.log(storedUserData);
      if (storedUserData!==null){
        const parsedUserData = JSON.parse(storedUserData);        
        setFirstName(parsedUserData.firstName || '');
        setUserEmail(parsedUserData.email || '');
        setLastName(parsedUserData.lastName || '');
        setPhoneNumber(parsedUserData.phoneNumber || ''); 
      }
    } catch (error){
      console.log('Error fetching user data', error);
    }
  };

  useEffect(()=>{
    fetchUserData();
  },[]);


  /*
  useEffect(()=>{
    const prepareApp = async () => {
      try {
        await Font.loadAsync({
          'MarkaziText-Regular': require('../app/assets/fonts/MarkaziText-Regular.ttf'),
          'Karla-Regular': require('../app/assets/fonts/Karla-Regular.ttf'),
        });

        await fetchUserData();
      } catch(e){
        console.warn(e);
      } finally {
        setFontsLoaded(true);
      }
    };
    prepareApp();
  },[]);
  */

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
      <View style = {styles.lemonHeader}>
        
      </View>
      <View style = {styles.infoContainer}>
        <Text style={styles.personalInfoText}>Personal Information</Text>
        <View style={styles.textInputs}>
          <Text>First Name</Text>
          <TextInput
            style = {styles.input}            
            value = {firstName}
            onChangeText={validateName}
          />
          <Text>Last Name</Text>
          <TextInput
            style = {styles.input}            
            value = {lastName}
            onChangeText={validateLastName}
          />  
          <Text>Phone Number</Text>          
          <TextInput
          style = {styles.input}          
          value = {phoneNumber}
          onChangeText={validatePhoneNumber}
          />
          <Text>E-mail</Text>
          <TextInput
          style = {styles.input}          
          value = {userEmail}
          onChangeText={validateEmail}
          />
        </View>
      </View> 
      <View>
        <CheckBox
            checked={notifications.orderStatuses}
            onPress={()=>
                setNotifications({ ...notifications, orderStatuses: !notifications.orderStatuses})
            }
        />
        <Text> Order Statuses</Text>
        <CheckBox
            checked={notifications.passwordChanges}
            onPress={()=>
                setNotifications({ ...notifications, passwordChanges: !notifications.passwordChanges})
            }
        />
        <Text> Password Changes</Text>
        <CheckBox
            checked={notifications.specialOffers}
            onPress={()=>
                setNotifications({ ...notifications, specialOffers: !notifications.specialOffers})
            }
        />
        <Text> Special Offers</Text>
        <CheckBox
            checked={notifications.newsletter}
            onPress={()=>
                setNotifications({ ...notifications, newsletter: !notifications.newsletter})
            }
        />
        <Text> Newsletter </Text>
      </View>
     
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {   
    width: '100%', 
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 1,
    marginBottom: 10,
    fontFamily: 'Karla-Regular', 
    padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',    
  },
  text: {
    fontSize: 24,
  },
  personalInfoText: {
    fontSize:24,
    fontFamily: 'Karla-Regular',
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: 10,
  },
  lemonHeader:{
    flex: 2,
  },
  infoContainer: {
    flex: 16,
    alignItems: 'flex-start',
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,    
  },
  textInputs: {  
    paddingHorizontal: 20,
    width: '100%',
  },
});