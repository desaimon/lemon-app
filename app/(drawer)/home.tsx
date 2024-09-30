import React from 'react';
import { View, StyleSheet, Text, Image, FlatList, TouchableOpacity, TextInput, ActivityIndicator  } from 'react-native';
import { useRouter } from 'expo-router';
import { useFonts } from "expo-font";


const HomeScreen = () => {

  

    const router = useRouter();   

    const [fontsLoaded] = useFonts({
      "Karla-Regular": require("../../assets/fonts/Karla-Regular.ttf"),
      "MarkaziText-Regular": require("../../assets/fonts/MarkaziText-Regular.ttf"),
    });
    
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
         <View style={styles.bioContainer}>
          <Text style={styles.lemonHeaderText}>
            Little Lemon
          </Text>
          <Text style={styles.chicagoText}>
            Chicago
          </Text>
          <Text style={styles.bioText}>
            We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
          </Text>
         </View>
        </View>
      );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bioContainer: {
    flex: 5,
    backgroundColor: "#495E57", 
  },
  filterContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  menuContainer: {
    flex: 12,
    alignItems: 'center',
  },
  itemContainer: {

  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'white',
  },
  lemonHeaderText: {
    color: "#F4CE14",
    fontFamily: "MarkaziText-Regular",
  },
  chicagoText : {
    color: "white",
    fontFamily: "MarkaziText-Regular",
  },
  bioText: {
    color: "white",
    fontFamily: "MarkaziText-Regular",
  },
  filterButton: {
    backgroundColor: "gray",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginTop: 3,
    fontFamily: "MarkaziText-Regular",
  },
  filterButtonText: {
    color: "#F4CE14", 
    fontFamily: "MarkaziText-Regular",   
  },
  itemTitleText: {
    color: "black",
    fontFamily: "MarkaziText-Regular",
    fontWeight: '600',
  },
  itemDescText: {
    color: "#F4CE14",
    fontFamily: "MarkaziText-Regular", 
  },
  priceText: {
    color: "#F4CE14",
    fontFamily: "MarkaziText-Regular",
  },


});