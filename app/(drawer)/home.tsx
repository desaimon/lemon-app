import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseAsync('little_lemon');


const HomeScreen = () => {
  const router = useRouter();
  const [menuItems, setMenuItems] = useState([]);

  const [fontsLoaded] = useFonts({
    "Karla-Regular": require("../../assets/fonts/Karla-Regular.ttf"),
    "MarkaziText-Regular": require("../../assets/fonts/MarkaziText-Regular.ttf"),
    "SpaceMono-Regular": require("../../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [isDataFetched, setIsDataFetched] = useState(false);

  
  const getDataFromApiAsync = async () => {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json"
      );
      const json = await response.json();      
      setMenuItems(json.menu);
      setIsDataFetched(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDataFromApiAsync();
  }, []);

 

  if (!fontsLoaded || !isDataFetched) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }
 
  return (
    <View style={styles.container}>
      <View style={styles.infoSection}>
        <View style={styles.infoSectionTitle}>
          <Text style={styles.lemonHeaderText}>Little Lemon</Text>
        </View>
        <View style={styles.infoSectionTxtImg}>
          <View style={styles.infoSectionDesc}>
            <Text style={styles.chicagoText}>Chicago</Text>
            <Text style={styles.bioText}>
              We are a family owned Mediterranean restaurant, focused on
              traditional recipes served with a modern twist.
            </Text>
          </View>

          <Image
            source={require("../../assets/images/Hero image.png")}
            style={styles.restaurantImage}
          />
        </View>
        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.menuContainer}>
        <Text style={styles.menuTitleText}> ORDER FOR DELIVERY </Text>
        <View style={styles.categoryContainer}>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.filterButtonText}>Starters</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.filterButtonText}>Mains</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.filterButtonText}>Desserts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.filterButtonText}>Drinks</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.itemContainer}>
          <FlatList
            data={menuItems}
            renderItem={({ item }) => (
              <View>
                <Text>{item.name}</Text>
                <Text>{item.description}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoSection: {
    flex: 2,
    backgroundColor: "#495E57",
  },
  infoSectionTitle: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "flex-start",
    marginBottom: -20,
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 16,
    paddingHorizontal: 16,
    marginTop: 10,
  },
  menuTitleContainer: {
    flex: 1,
  },
  searchButton: {
    width: 50,
    height: 50,
    backgroundColor: "lightgray",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryButton: {
    backgroundColor: "lightgray",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    width: "23%",
    alignItems: "center",
  },
  infoSectionDesc: {
    flexDirection: "column",
    width: "50%",
    alignSelf: "flex-start",
  },
  infoSectionTxtImg: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "lightgray",
  },
  menuContainer: {
    flex: 3,
    marginLeft: 10,
    marginRight: 10,
  },
  restaurantImage: {
    height: "80%",
    width: "40%",
    borderRadius: 8,
    resizeMode: "cover",
    marginTop: 20,
    marginRight: 10,
  },
  itemContainer: {},
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  lemonHeaderText: {
    color: "#F4CE14",
    fontSize: 60,
    fontFamily: "MarkaziText-Regular",
    marginLeft: 10,
  },
  chicagoText: {
    color: "white",
    fontSize: 35,
    fontFamily: "MarkaziText-Regular",
    marginBottom: 10,
    marginLeft: 10,
  },
  menuTitleText: {
    color: "black",
    fontSize: 30,
    fontFamily: "MarkaziText-Regular",
    marginTop: 10,
    marginBottom: 10,
  },
  bioText: {
    color: "white",
    fontFamily: "MarkaziText-Regular",
    fontSize: 20,
    marginLeft: 10,
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
    color: "#495E57",
    fontSize: 17,
    fontFamily: "MarkaziText-Regular",
    fontWeight: "bold",
  },
  itemTitleText: {
    color: "black",
    fontFamily: "MarkaziText-Regular",
    fontWeight: "600",
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
