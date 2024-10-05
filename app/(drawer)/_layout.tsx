import React, { useState, useEffect } from "react";
import { Drawer } from "expo-router/drawer";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { useRouter, useSegments } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { parse } from "@babel/core";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { getBackgroundColorAsync } from "expo-system-ui";
import { useUser, UserProvider } from "../UserContext";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./home";
import ProfileScreen from "./profile";
const Stack = createStackNavigator();

export default function DrawerLayout() {
  const router = useRouter();
  const segments = useSegments();
  const {profileImageUri, setProfileImageUri} = useUser();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem("userData");
        if (storedUserData !== null) {
          const parsedUserData = JSON.parse(storedUserData);
          setFirstName(parsedUserData.firstName || "");
          setLastName(parsedUserData.lastName || ""); 
          setProfileImageUri(parsedUserData.profileImageUri || null)         
        }
      } catch (e) {
        console.log("Error fetching user data", e);
      }
    };

    fetchUserData();
  }, []);

  const getInitials = () => {
    const firstNameInitial = firstName ? firstName.charAt(0).toUpperCase() : "";
    const lastNameInitial = lastName ? lastName.charAt(0).toUpperCase() : "";
    return `${firstNameInitial}${lastNameInitial}`;
  };

  const isHome = segments[1] === "home";

  const navigateToProfile = () => {
    // Ensure navigation is only triggered after the component is fully mounted
    if (router && typeof router.navigate === "function") {
      router.navigate("/(drawer)/profile");
    }
  };

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.header}>
          {!isHome && (
            <TouchableOpacity onPress={() => router.back()}>
              <View style={styles.backCircle}>
                <Ionicons name="arrow-back" size={24} color="white" />
              </View>
            </TouchableOpacity>
          )}
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/images/Logo.png")}
              style={styles.logo}
            />
          </View>
          <TouchableOpacity 
            style={styles.profileButtonContainer}
            onPress={navigateToProfile}>
            {profileImageUri ? (
              <Image
                source={{ uri: profileImageUri }}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.placeholder}>
                <Text style={styles.initials}>{getInitials()}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,  // Handle headers manually
        }}
      >
        {/* Stack Screens */}
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="profile" component={ProfileScreen} />
      </Stack.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 0,
    backgroundColor: "white",
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "white",
  },
  backButton: {
    fontSize: 18,
    color: "#000",
  },
  logo: {
    resizeMode: "contain",
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  profileButtonContainer: {
    position: "absolute",
    right: 10,
    top: 10,    
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  placeholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  initials: {
    fontSize: 18,
    color: "#fff",
  },
  backIcon: {
    backgroundColor: "#495E57",
  },
  backCircle: {
    width: 40, 
    height: 40,
    borderRadius: 25,
    backgroundColor: "#495E57", // Green background
    justifyContent: "center",
    alignItems: "center",
  },
});
