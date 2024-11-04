import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  ActivityIndicator,
  Button,
  Modal,
  TextInput,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { fetchAccount, updateAccount } from "../api/accountService";
import URL from "../midleware/authMidleware";
import URL from "../midleware/authMidleware";

const AccountDetail = () => {
  const [image, setImage] = useState(null);
  const [id, setId] = useState("");
  const [account, setAccount] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [updatedAccount, setUpdatedAccount] = useState({
    fullName: null,
    birthDate: null,
    address: null,
    phone: null,
    email: null,
    position: null,
    role: null,
    department: null,
    startDate: null,
    salary: null,
    avatar: null,
  });

  const loadData = async () => {
    try {
      const idUser = await AsyncStorage.getItem("userId");
      console.log(idUser);

      if (idUser) {
        setId(idUser);
      } else {
        setError("User ID is not available");
      }
    } catch (error) {
      console.log("Error fetching data from AsyncStorage", error);
      setError("Error fetching user ID from AsyncStorage");
    }
  };

  const fetchData = async () => {
    if (!id) {
      setError("Invalid ID for fetching account data");
      return;
    }

    setLoading(true);
    try {
      const accountData = await fetchAccount(id);
      setAccount(accountData);
      setUpdatedAccount({
        fullName: accountData.fullName || null,
        birthDate: accountData.birthDate || null,
        address: accountData.address || null,
        phone: accountData.phone || null,
        email: accountData.email || null,
        position: accountData.position || null,
        role: accountData.role || null,
        department: accountData.department || null,
        startDate: accountData.startDate || null,
        salary: accountData.salary || null,
        avatar: accountData.avatar,
        workHistory: accountData.workHistory || [],
      });
      setError(null); // Clear any existing errors
    } catch (err) {
      setError(`Error fetching account data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
      fetchData();
    }, [id])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const handleUpdateAccount = async () => {
    const validationErrors = [];

    // Add specific validation rules for fields
    if (updatedAccount.phone && !/^\d{10,15}$/.test(updatedAccount.phone)) {
      validationErrors.push("Phone number must be between 10-15 digits.");
    }
    if (
      updatedAccount.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updatedAccount.email)
    ) {
      validationErrors.push("Invalid email format.");
    }
    if (updatedAccount.salary && isNaN(updatedAccount.salary)) {
      validationErrors.push("Salary must be a valid number.");
    }

    if (validationErrors.length > 0) {
      setError(validationErrors.join("\n"));
      return;
    }

    try {
      await updateAccount(id, updatedAccount);
      const accountData = await fetchAccount(id);
      setAccount(accountData);
      setUpdatedAccount(accountData);
      setVisible(false);
      setError(null); // Clear error if successful
    } catch (err) {
      setError(`Error updating account: ${err.message}`);
    }
  };

  const handleImageUpload = async () => {
    let result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!result.granted) {
      alert("Bạn cần cấp quyền truy cập thư viện ảnh.");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      const selectedImageUri = pickerResult.assets[0].uri;
      setImage(selectedImageUri);

      const formData = new FormData();
      formData.append("avatar", {
        uri: selectedImageUri,
        type: "image/jpeg",
        name: "profile.jpg",
      });

      try {
        await axios.put(
          `http://${URL.BASE_URL}:5000/api/auth/upload/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        alert("Upload thành công!");
      } catch (err) {
        alert("Upload thất bại.");
        console.error(err);
      }
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#6200ee" />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button onPress={onRefresh}>Try Again</Button>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.avatarContainer}>
          {account?.avatar && (
            <Image
              source={{
                uri: `http://${URL.BASE_URL}:5000/${account.avatar}`,
              }}
              style={styles.avatar}
            />
          )}
          <TouchableOpacity onPress={handleImageUpload}>
            <Text style={styles.uploadButtonText}>Upload</Text>
          </TouchableOpacity>
        </View>
        <View>
          {renderDetail("Full Name", account.fullName, "person")}
          {renderDetail("Birth Date", account.birthDate || "N/A", "event")}
          {renderDetail("Address", account.address || "N/A", "location-on")}
          {renderDetail("Phone", account.phone || "N/A", "phone")}
          {renderDetail("Email", account.email, "email")}
          {renderDetail("Position", account.position || "N/A", "work")}
          {renderDetail("Role", account.role, "supervisor-account")}
          {renderDetail("Department", account.department || "N/A", "business")}
          {renderDetail("Start Date", account.startDate || "N/A", "date-range")}
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setVisible(true)}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>

        <Modal
          visible={visible}
          animationType="slide"
          onDismiss={() => setVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <ScrollView>
            <Text style={styles.modalTitle}>Edit Account</Text>
            {Object.keys(updatedAccount).map((key) => (
              <TextInput
                key={key}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                value={updatedAccount[key]}
                onChangeText={(text) =>
                  setUpdatedAccount({ ...updatedAccount, [key]: text || null })
                }
                style={styles.textInput}
              />
            ))}
            <Button mode="contained" onPress={handleUpdateAccount}>
              Update Account
            </Button>
          </ScrollView>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const renderDetail = (label, value, iconName) => (
  <View style={styles.detailContainer}>
    <Icon name={iconName} size={20} />
    <Text style={styles.detailLabel}>{label}: </Text>
    <Text>{value || "N/A"}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    height: "100%",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  uploadButtonText: {
    color: "#6200ee",
  },
  editButton: {
    backgroundColor: "#6200ee",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  editButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  modalContainer: {
    backgroundColor: "white",
    height: "100%",
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 16,
  },
  textInput: {
    marginBottom: 16,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    margin: 20,
  },
  detailContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailLabel: {
    fontWeight: "bold",
  },
});

export default AccountDetail;
