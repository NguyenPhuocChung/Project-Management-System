import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { checkEmail, sendOTP } from "../api/authService"; // Hàm gửi OTP

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSendOtp = async () => {
    // Kiểm tra tính hợp lệ của email và mật khẩu
    if (!email) {
      Alert.alert("Error", "Please enter your email.");
      return;
    }
    if (!password) {
      Alert.alert("Error", "Please enter your password.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    try {
      const check = await checkEmail(email);
      console.log("====================================");
      console.log(check);
      console.log("====================================");
      if (!check) {
        Alert.alert("Error", "Email not found.");
        return;
      }
      console.log("====================================");
      console.log(check.userId);
      console.log("====================================");
      await sendOTP(email); // Gọi API gửi OTP
      Alert.alert("Success", "OTP has been sent to your email.");
      navigation.navigate("OTPInput", {
        email: email,
        password: password,
        id: check.userId,
      }); // Chuyển sang màn hình nhập OTP
    } catch (error) {
      Alert.alert("Error", "Failed to send OTP. Please try again.");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address" // Đặt loại bàn phím cho email
      />
      <TextInput
        style={styles.input}
        placeholder="Enter new password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry // Bảo mật mật khẩu
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm new password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry // Bảo mật mật khẩu
      />
      <TouchableOpacity style={styles.button} onPress={handleSendOtp}>
        <Text style={styles.buttonText}>Send OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f7f7f7", // Màu nền sáng
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    color: "#333", // Màu chữ tiêu đề
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 8, // Bo góc cho ô nhập
    backgroundColor: "#fff", // Màu nền trắng cho ô nhập
  },
  button: {
    backgroundColor: "#4CAF50", // Màu nền nút
    borderRadius: 8,
    padding: 15,
    alignItems: "center", // Căn giữa văn bản trong nút
  },
  buttonText: {
    color: "#fff", // Màu chữ trên nút
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ForgotPasswordScreen;
