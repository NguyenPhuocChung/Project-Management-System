import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
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
import HomeMember from "../member/home";
import URL from "../midleware/authMidleware";

const Member = () => {
  const navigation = useNavigation();
  const [id, setId] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [modalVisible, setModalVisible] = useState(false);

  const loadData = async () => {
    try {
      const idUser = await AsyncStorage.getItem("userId");
      if (idUser) {
        setId(idUser);
      } else {
        console.log("User ID is not available");
        Alert.alert("Error", "User ID not found. Please log in again.");
        setLoading(false);
      }
    } catch (error) {
      console.log("Error fetching data from AsyncStorage", error);
      Alert.alert("Error", "Failed to load user ID. Please try again.");
      setLoading(false);
    }
  };

  const fetch = async () => {
    if (id) {
      try {
        setLoading(true);
        const accountData = await fetchAccount(id);
        setData(accountData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching account data:", error);
        Alert.alert(
          "Error",
          "Failed to fetch account data. Please try again later."
        );
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    loadData(); // Load user ID on component mount
  }, []);

  useEffect(() => {
    if (id) {
      fetch(); // Fetch data only when ID is set
    }
  }, [id]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userEmail");
      await AsyncStorage.removeItem("userRole");
      await AsyncStorage.removeItem("userPassword");

      console.log("Signed out");
      navigation.navigate("Login");
    } catch (error) {
      console.log("Error clearing AsyncStorage during logout", error);
      Alert.alert("Error", "Failed to log out. Please try again.");
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
          onPress: handleLogout,
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text>Loading...</Text>
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
          <Image
            source={
              data && data.avatar
                ? {
                    uri: `http://${URL.BASE_URL}:5000/${data.avatar}`,
                  }
                : require("../assets/images.png") // Fallback to a default image
            }
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      <HomeMember />

      {/* Modal for menu */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalBackground}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Member;
