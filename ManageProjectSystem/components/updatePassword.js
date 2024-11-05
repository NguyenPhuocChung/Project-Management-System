import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { checkPassword, sendOTP } from "../api/authService";
const UpdatePasswordScreen = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();
  const [id, setId] = useState("");
  const [mail, setMail] = useState("");
  const [error, setError] = useState("");
  const loadData = async () => {
    try {
      const idUser = await AsyncStorage.getItem("userId");
      const mail = await AsyncStorage.getItem("userEmail");

      console.log(idUser);

      if ((idUser, mail)) {
        setId(idUser);
        setMail(mail);
      } else {
        setError("User ID is not available");
      }
    } catch (error) {
      console.log("Error fetching data from AsyncStorage", error);
      setError("Error fetching user ID from AsyncStorage");
    }
  };
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [id])
  );
  const handleUpdatePassword = async () => {
    if (currentPassword === "" && newPassword === "") {
      Alert.alert("Error", "Please enter current password!");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New password and confirm password do not match!");
      return;
    } else {
      try {
        console.log("====================================");
        console.log(id, currentPassword);
        console.log("====================================");
        const password = await checkPassword(id, currentPassword);
        if (!password) {
          Alert.alert("Error", "Current password is incorrect!");
          return;
        }
        const send = await sendOTP(mail);
        if (!send) {
          Alert.alert("Error", "Failed to send OTP. Please try again!");
          return;
        }
        navigation.navigate("OTPInput", {
          password: newPassword,
          id: id,
        });
      } catch (e) {
        Alert.alert("Error", "Password wrong. Please try again!");
        console.error(e);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Current Password"
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm New Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Button
        title="Update Password"
        onPress={handleUpdatePassword}
        color="#4CAF50"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#F5F5F5", // Màu nền sáng
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333", // Màu chữ tiêu đề
  },
  input: {
    height: 50,
    borderColor: "#4CAF50", // Màu viền xanh lá
    borderWidth: 1,
    borderRadius: 8, // Bo góc cho viền
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#FFF", // Màu nền trắng cho ô nhập
  },
});

export default UpdatePasswordScreen;
