import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Import the icon library
import { registerUser } from "../api/authService"; // Import your API functions

const Register = () => {
  const [role, setRole] = useState("leader"); // Default role
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility
  const navigation = useNavigation();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleCreateAccount = async () => {
    if (!isValidEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address!");
      return;
    }

    if (!isValidPassword(password)) {
      Alert.alert(
        "Error",
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number."
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    try {
      const response = await registerUser(role, email, password);
      if (response.status === 201) {
        Alert.alert(
          "Success",
          `Account created for ${email} with role ${role}`
        );
        navigation.goBack();
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      if (error.response) {
        // Extract and display the custom error message from the server response
        const serverMessage =
          error.response.data.message || "An unexpected error occurred.";
        Alert.alert("Error", serverMessage);
      } else {
        console.error(error);
        Alert.alert("Error", "Failed to create account");
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Create Account</Text>

          <Text style={styles.label}>Account Role:</Text>
          <Picker
            selectedValue={role}
            style={styles.picker}
            onValueChange={(itemValue) => setRole(itemValue)}
          >
            <Picker.Item label="Leader" value="leader" />
            <Picker.Item label="Member" value="member" />
          </Picker>

          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Password:</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword} // Toggle secure entry
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.showButton}
            >
              <Icon
                name={showPassword ? "eye" : "eye-off"}
                size={20}
                color="#000"
              />
              {/* Use icons */}
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Confirm Password:</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showPassword} // Toggle secure entry for confirm
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.showButton}
            >
              <Icon
                name={showPassword ? "eye" : "eye-off"}
                size={20}
                color="#000"
              />
              {/* Use icons */}
            </TouchableOpacity>
          </View>

          <Button title="Create Account" onPress={handleCreateAccount} />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontWeight: "bold",
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: "90%",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  showButton: {
    marginLeft: 10,
    marginVertical: 20,
  },
});

export default Register;
