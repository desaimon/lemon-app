import React from "react";
import {View,Text,TextInput,StyleSheet,ActivityIndicator,KeyboardAvoidingView,Platform,TouchableWithoutFeedback, Keyboard, ScrollView, Image, StatusBar} from "react-native";
import { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CheckBox } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { useRouter, useSegments } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileScreen = () => {
  const router = useRouter();
  const segments = useSegments();

  const [firstName, setFirstName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");


  const [originalData, setOriginalData] = useState("");

  const [isValidName, setIsValidName] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidLastName, setIsValidLastName] = useState(false);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);

  const [notifications, setNotifications] = useState({
    orderStatuses: false,
    passwordChanges: false,
    specialOffers: false,
    newsletter: false,
  });

  const [imageUri, setImageUri] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    setImageUri(null);
  };

  const getInitials = () => {
    const firstNameInitial = firstName ? firstName.charAt(0).toUpperCase() : "";
    const lastNameInitial = lastName ? lastName.charAt(0).toUpperCase() : "";
    return `${firstNameInitial}${lastNameInitial}`;
  };

  const [fontsLoaded] = useFonts({
    "Karla-Regular": require("../../assets/fonts/Karla-Regular.ttf"),
    "MarkaziText-Regular": require("../../assets/fonts/MarkaziText-Regular.ttf"),
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

  const validateLastName = (lastName: string) => {
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
    if (phone.length === 0) {
      setIsValidPhoneNumber(false);
      return;
    }

    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    setIsValidPhoneNumber(phoneRegex.test(phone));
  };

  const fetchUserData = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem("userData");
      console.log(storedUserData);
      if (storedUserData !== null) {
        const parsedUserData = JSON.parse(storedUserData);
        setOriginalData(parsedUserData);
        setFirstName(parsedUserData.firstName || "");
        setUserEmail(parsedUserData.email || "");
        setLastName(parsedUserData.lastName || "");
        setPhoneNumber(parsedUserData.phoneNumber || "");
      }
    } catch (error) {
      console.log("Error fetching user data", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem("userData");
      await AsyncStorage.removeItem("@userName");
      await AsyncStorage.removeItem("@userEmail");
      await AsyncStorage.setItem("@onboardingComplete", "false");
      router.replace("/onboarding");
    } catch (error) {
      console.log("Error clearing user data:", error);
    }
  };

  const discardChanges = () => {
    setFirstName(originalData.firstName || "");
    setUserEmail(originalData.email || "");
    setLastName(originalData.lastName || "");
    setPhoneNumber(originalData.phoneNumber || "");
    setImageUri(originalData.imageUri || null);
  };

  const saveChanges = async () => {
    console.log("save changes");
    const updatedUserData = {
      firstName,
      email: userEmail,
      lastName,
      phoneNumber,
      imageUri,
    };

    try {
      await AsyncStorage.setItem("userData", JSON.stringify(updatedUserData));
    } catch (error) {
      console.log("Error saving user data", error);
    }
    fetchUserData();
  };

  const isFormValid = () => {
    const firstNameValid =
      (firstName !== originalData.firstName && isValidName) ||
      firstName === originalData.firstName;
    const emailValid =
      (userEmail !== originalData.email && isValidEmail) ||
      userEmail === originalData.email;
    const lastNameValid =
      (lastName !== originalData.lastName && isValidLastName) ||
      lastName === originalData.lastName;
    const phoneNumberValid =
      (phoneNumber !== originalData.phoneNumber && isValidPhoneNumber) ||
      phoneNumber === originalData.phoneNumber;
    const isSthChanged =
      firstName !== originalData.firstName ||
      phoneNumber !== originalData.phoneNumber ||
      userEmail !== originalData.email ||
      lastName !== originalData.lastName ||
      imageUri !== originalData.imageUri;


    return (
      firstNameValid &&
      emailValid &&
      lastNameValid &&
      phoneNumberValid &&
      isSthChanged
    );
  };

  const isFormChanged = () => {
    return (
      firstName !== originalData.firstName ||
      phoneNumber !== originalData.phoneNumber ||
      userEmail !== originalData.email ||
      lastName !== originalData.lastName ||
      imageUri !== originalData.imageUri
  )};

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
     
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
               keyboardShouldPersistTaps="handled"
               showsVerticalScrollIndicator={false}
               contentContainerStyle={styles.scrollContainer}>
            <View style={styles.textInputs}>
              <Text style={styles.personalInfoText}>Personal Information</Text>
              <Text style={styles.text}>Avatar</Text>
              <View style={styles.avatarContainer}>
                {imageUri ? (
                  <Image
                    source={{ uri: imageUri }}
                    style={styles.profileImage}
                  />
                ) : (
                  <View style={styles.placeholder}>
                    <Text style={styles.initials}>{getInitials()}</Text>
                  </View>
                )}
                <TouchableOpacity
                  style={styles.changePicButton}                  
                  onPress={pickImage}             
                >
                  <Text style = {styles.buttonTextEnabled}>
                    Change
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.text}>First Name</Text>
              <TextInput
                style={styles.input}
                value={firstName}
                onChangeText={validateName}
              />
              <Text style={styles.text}>Last Name</Text>
              <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={validateLastName}
              />
              <Text style={styles.text}>Phone Number</Text>
              <TextInput
                style={styles.input}
                value={phoneNumber}
                onChangeText={validatePhoneNumber}
              />
              <Text style={styles.text}>E-mail</Text>
              <TextInput
                style={styles.input}
                value={userEmail}
                onChangeText={validateEmail}
              />

              <Text style={styles.personalInfoText}> Email notifications </Text>
              <View style={styles.CheckBoxes}>
                <CheckBox
                  containerStyle={{ padding: 0, margin: 0 }}
                  wrapperStyle={{ marginLeft: 0 }}
                  checked={notifications.orderStatuses}
                  onPress={() =>
                    setNotifications({
                      ...notifications,
                      orderStatuses: !notifications.orderStatuses,
                    })
                  }
                  checkedIcon={
                    <View style={[styles.customCheckedBox, { marginLeft: 0 }]}>
                      <Text style={styles.tickMark}>✓</Text>
                    </View>
                  }
                  uncheckedIcon={
                    <View
                      style={[styles.customUncheckedBox, { marginLeft: 0 }]}
                    />
                  }
                />
                <Text style={styles.textCheckbox}> Order Statuses</Text>
              </View>
              <View style={styles.CheckBoxes}>
                <CheckBox
                  containerStyle={{ padding: 0, margin: 0 }}
                  wrapperStyle={{ marginLeft: 0 }}
                  checked={notifications.passwordChanges}
                  onPress={() =>
                    setNotifications({
                      ...notifications,
                      passwordChanges: !notifications.passwordChanges,
                    })
                  }
                  checkedIcon={
                    <View style={styles.customCheckedBox}>
                      <Text style={styles.tickMark}>✓</Text>
                    </View>
                  }
                  uncheckedIcon={
                    <View
                      style={[styles.customUncheckedBox, { marginLeft: 0 }]}
                    />
                  }
                />
                <Text style={styles.textCheckbox}> Password Changes</Text>
              </View>
              <View style={styles.CheckBoxes}>
                <CheckBox
                  containerStyle={{ padding: 0, margin: 0 }}
                  wrapperStyle={{ marginLeft: 0 }}
                  checked={notifications.specialOffers}
                  onPress={() =>
                    setNotifications({
                      ...notifications,
                      specialOffers: !notifications.specialOffers,
                    })
                  }
                  checkedIcon={
                    <View style={[styles.customCheckedBox, { marginLeft: 0 }]}>
                      <Text style={styles.tickMark}>✓</Text>
                    </View>
                  }
                  uncheckedIcon={
                    <View
                      style={[styles.customUncheckedBox, { marginLeft: 0 }]}
                    />
                  }
                />
                <Text style={styles.textCheckbox}> Special Offers</Text>
              </View>
              <View style={styles.CheckBoxes}>
                <CheckBox
                  containerStyle={{ padding: 0, margin: 0 }}
                  wrapperStyle={{ marginLeft: 0 }}
                  checked={notifications.newsletter}
                  onPress={() =>
                    setNotifications({
                      ...notifications,
                      newsletter: !notifications.newsletter,
                    })
                  }
                  checkedIcon={
                    <View style={[styles.customCheckedBox, { marginLeft: 0 }]}>
                      <Text style={styles.tickMark}>✓</Text>
                    </View>
                  }
                  uncheckedIcon={
                    <View
                      style={[styles.customUncheckedBox, { marginLeft: 0 }]}
                    />
                  }
                />
                <Text style={styles.textCheckbox}> Newsletter </Text>
              </View>
              <TouchableOpacity style={styles.logOutButton} onPress={logOut}>
                <Text>LOGOUT</Text>
              </TouchableOpacity>
              <View style={styles.bottomButtonsContainer}>
                <TouchableOpacity
                  style={
                    isFormChanged()
                      ? styles.discardButtonEnabled
                      : styles.discardButtonDisabled
                  }
                  onPress={discardChanges}
                  disabled={!isFormChanged()}
                >
                  <Text
                    style={
                      isFormChanged()
                        ? styles.buttonTextEnabled
                        : styles.buttonTextDisabled
                    }
                  >
                    Discard Changes
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={
                    isFormValid()
                      ? styles.saveButtonEnabled
                      : styles.saveButtonDisabled
                  }
                  onPress={saveChanges}
                  disabled={!isFormValid()}
                >
                  <Text
                    style={
                      isFormValid()
                        ? styles.buttonTextEnabled
                        : styles.buttonTextDisabled
                    }
                  >
                    Save Changes
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>      
    </KeyboardAvoidingView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  CheckBoxes: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  customCheckedBox: {
    width: 20,
    height: 20,
    backgroundColor: "#495E57",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    margin: 8,
  },
  customUncheckedBox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#C0C0C0",
    borderRadius: 4,
    margin: 8,
  },
  tickMark: {
    color: "white",
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'white',
  },
  scrollContainer: {   
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 1,
    marginBottom: 5,
    fontFamily: "Karla-Regular",
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "gray",
    margin: 3,
  },
  text: {
    fontSize: 16,
    fontFamily: "MarkaziText-Regular",
  },
  textCheckbox: {
    fontSize: 18,
    fontFamily: "MarkaziText-Regular",
  },
  personalInfoText: {
    fontSize: 14,
    fontFamily: "Karla-Regular",
    fontWeight: "bold",
    textAlign: "left",
    marginTop: 5,
    marginBottom: 10,
  },
  textInputs: {
    paddingHorizontal: 20,
    width: "100%",    
  },
  logOutButton: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F4CE14",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 2,
  },
  bottomButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  avatarContainer: {
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    width: "80%",
    marginBottom: 10,
    marginTop: 5,
    backgroundColor: 'white',
  },
  discardButtonEnabled: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginTop: 3,
  },
  discardButtonDisabled: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 3,
  },
  buttonTextEnabled: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
  },
  buttonTextDisabled: {
    color: "#D3D3D3",
    fontSize: 14,
    textAlign: "center",
  },
  saveButtonEnabled: {
    backgroundColor: "#495E57",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginTop: 3,
  },
  changePicButton: {
    backgroundColor: "#495E57",
    height: 40,
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,

  },
  saveButtonDisabled: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 3,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  placeholder: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  initials: {
    fontSize: 30,
    color: "#fff",
  },
});
