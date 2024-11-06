import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import React, { useCallback, useState } from "react";
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

const AccountDetail = () => {
  const navigation = useNavigation();

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
    position: null,
    department: null,
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
        position: accountData.position || null,
        department: accountData.department || null,
      });
      setError(null);
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
      setError(null);
    } catch (err) {
      setError(`Error updating account: ${err.message}`);
    }
  };

  const handleImageUpload = async () => {
    let result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!result.granted) {
      alert("You need to grant permission to access the photo library.");
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
        alert("Upload successful!");
      } catch (err) {
        alert("Upload failed.");
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
        <Text style={styles.errorText}>Error update</Text>
        <Button mode="contained" onPress={onRefresh}>
          Try Again
        </Button>
      </View>
    );
  }
  const formatDate = () => {
    let date = new Date(account.startDate);
    let formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    return formattedDate;
  };
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
          <Image
            source={
              account && account.avatar
                ? {
                    uri: `http://${URL.BASE_URL}:5000/${account.avatar}`,
                  }
                : require("../assets/images.png") // Fallback to a default image
            }
            style={styles.avatar}
          />
          <TouchableOpacity
            onPress={handleImageUpload}
            style={styles.uploadButton}
          >
            <Text style={styles.uploadButtonText}>Upload New Photo</Text>
          </TouchableOpacity>
        </View>
        <View>
          {renderDetail("Full Name", account.fullName, "person")}
          {renderDetail(
            "Birth Date",
            formatDate(account.birthDate) || "N/A",
            "event"
          )}
          {renderDetail("Address", account.address || "N/A", "location-on")}
          {renderDetail("Phone", account.phone || "N/A", "phone")}
          {renderDetail("Position", account.position || "N/A", "work")}
          {renderDetail("Department", account.department || "N/A", "business")}
          {renderDetail(
            "Start Date",
            formatDate(account.startDate) || "N/A",
            "date-range"
          )}
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setVisible(true)}
        >
          <Text style={styles.editButtonText}>Edit Account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.passwordButton}
          onPress={() => {
            navigation.navigate("UpdatePassword", {
              name: "UpdatePassword",
              id,
              fullName: account.fullName,
              email: account.email,
            });
          }}
        >
          <Text style={styles.editButtonText}>Update password</Text>
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
    <Icon
      name={iconName}
      size={20}
      color="#6200ee"
      style={{ marginRight: 8 }}
    />
    <Text style={styles.detailLabel}>{label}:</Text>
    <Text style={styles.detailValue}>{value || "N/A"}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f5f5f5",
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#6200ee",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  uploadButton: {
    marginTop: 10,
    backgroundColor: "#6200ee",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  uploadButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  editButton: {
    backgroundColor: "#6200ee",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  passwordButton: {
    backgroundColor: "#333333",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  editButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    backgroundColor: "#ffffff",
    padding: 20,
    margin: 10,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6200ee",
    marginBottom: 16,
    textAlign: "center",
  },
  textInput: {
    marginBottom: 12,
    backgroundColor: "#f0f0f0",
  },
  detailContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailLabel: {
    fontWeight: "bold",
    color: "#333",
    marginRight: 5,
  },
  detailValue: {
    color: "#333",
  },
  errorText: {
    color: "red", // Giữ màu đỏ cho thông báo lỗi
    textAlign: "center", // Căn giữa văn bản
    marginBottom: 10, // Khoảng cách dưới
    fontSize: 16, // Cỡ chữ rõ ràng
    fontWeight: "bold", // Làm cho văn bản đậm
    backgroundColor: "#f8d7da", // Thêm nền màu nhạt để làm nổi bật thông báo lỗi
    paddingVertical: 5, // Khoảng cách dọc bên trong
    borderRadius: 5, // Bo góc để làm mềm mại
    borderWidth: 1, // Đường viền mỏng
    borderColor: "#f5c6cb", // Màu đường viền nhẹ
  },
});

export default AccountDetail;
