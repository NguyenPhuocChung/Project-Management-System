import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { verifyOtp } from "../api/authService";
const OTPInputScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id, password } = route.params;

  console.log("id and====================================");
  console.log(id, password);
  console.log("====================================");

  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleVerifyOTP = async () => {
    setIsLoading(true);
    // Gọi API xác nhận mã OTP ở đây
    try {
      const verify = await verifyOtp(otp, id, password);
      setIsLoading(false);
      if (verify) {
        Alert.alert("Success", "OTP verified successfully!");
        // Xử lý khi OTP đã xác
        navigation.navigate("Login");
      } else {
        Alert.alert("Error", "Invalid OTP. Please try again!");
      }
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Error", "An error occurred while verifying OTP.");
    }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    // Gọi API gửi lại mã OTP ở đây

    // Giả lập việc gửi lại OTP thành công sau 2 giây
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert("Success", "OTP has been resent to your phone!");
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        keyboardType="numeric"
        value={otp}
        onChangeText={setOtp}
      />
      <Button title="Verify OTP" onPress={handleVerifyOTP} color="#4CAF50" />
      <View style={styles.resendContainer}>
        <TouchableOpacity onPress={handleResendOTP} disabled={isLoading}>
          <View style={[styles.button, isLoading && styles.loadingButton]}>
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Resend OTP</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
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
  resendContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: "#f44336", // Màu nút gửi lại
    borderRadius: 8,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  loadingButton: {
    opacity: 0.5, // Giảm độ mờ khi đang tải
  },
});

export default OTPInputScreen;
