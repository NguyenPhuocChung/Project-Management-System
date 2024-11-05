import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { fetchAccount } from "../api/apiservice";

import HomeLeader from "../leader/Home";

const Leader = () => {
  const navigation = useNavigation();
  const [id, setId] = useState(null);
  const [data, setData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // Modal state
  const [error, setError] = useState(null); // Error state for better handling

  const loadData = async () => {
    try {
      const idUser = await AsyncStorage.getItem("userId");
      if (idUser) {
        setId(idUser);
      } else {
        console.log("User ID is null or undefined");
        setError("User ID is missing");
      }
    } catch (error) {
      console.log("Error fetching data from AsyncStorage", error);
      setError("Error fetching user ID from AsyncStorage");
    }
  };

  const fetch = async () => {
    if (!id) {
      console.log("ID is null or invalid");
      setError("Invalid user ID. Unable to fetch account data.");
      return;
    }

    try {
      const accountData = await fetchAccount(id);
      setData(accountData);
      setError(null); // Clear error if fetch is successful
    } catch (err) {
      console.log("Error fetching account data", err);
      setError(`Error fetching account: ${err.message}`);
    }
  };

  useEffect(() => {
    loadData(); // Call loadData to fetch user ID
  }, []);

  useEffect(() => {
    if (id) {
      fetch(); // Fetch account data only if ID is valid
    }
  }, [id]);

  const handleLogout = async () => {
    try {
      // Clear stored data in AsyncStorage
      await AsyncStorage.removeItem("userEmail");
      await AsyncStorage.removeItem("userRole");
      await AsyncStorage.removeItem("userPassword");
      console.log("Signed out");
      // await logout();
      // Navigate to the Login screen
      navigation.navigate("Login");
    } catch (error) {
      console.log("Error clearing AsyncStorage during logout", error);
      setError("Error during logout process");
    }
  };

  const handleSignOut = () => {
    Alert.alert(
      "Confirm Signout",
      "Are you sure you want to sign out?",
      [
        {
          text: "No",
          onPress: () => console.log("Signout canceled"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => handleLogout(),
        },
      ],
      { cancelable: false }
    );
  };

  const renderModalContent = () => (
    <View style={styles.modalContainer}>
      <Text style={styles.drawerTitle}>Menu</Text>
      <TouchableOpacity
        style={styles.menuItemContainer}
        onPress={handleSignOut}
      >
        <Ionicons name="log-out-outline" size={20} color="#4CAF50" />
        <Text style={styles.menuItem}>Signout</Text>
      </TouchableOpacity>
    </View>
  );

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <StatusBar />
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="menu-outline" size={30} style={styles.icon} />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Ionicons name="people-outline" size={24} style={styles.icon} />
          <Text style={styles.projectTitle}>{data?.fullName || "N/A"}</Text>
        </View>

        <TouchableOpacity>
          {data && data.avatar && (
            <Image
              source={{
                uri: `http://192.168.1.3:5000/${data.avatar}`,
              }}
              style={styles.avatar}
            />
          )}
        </TouchableOpacity>
      </View>

      <HomeLeader />

      {/* Modal for the menu */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false); // Close modal
        }}
      >
        <TouchableOpacity
          style={styles.modalBackground}
          activeOpacity={1} // Ensure no feedback when pressing the background
          onPress={() => setModalVisible(false)} // Close modal when pressing outside
        >
          <View style={styles.modalContainer}>{renderModalContent()}</View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    elevation: 4,
    zIndex: 1,
  },
  icon: {
    color: "black",
    marginHorizontal: 10,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    height: "100%",
    padding: 20,
  },
  drawerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  menuItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  menuItem: {
    fontSize: 18,
    paddingLeft: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
});

export default Leader;
