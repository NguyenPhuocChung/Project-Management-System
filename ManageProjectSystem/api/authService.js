import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import URL from "../midleware/authMidleware";

const BASE_URL = `http://${URL.BASE_URL}:5000/api/auth`;

export const registerUser = async (role, email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, {
      role,
      email,
      password,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

const EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 1 day in milliseconds

export const login = async (role, email, password) => {
  const data = { role, email, password };

  try {
    const response = await axios.post(`${BASE_URL}/login`, data);

    if (response.status === 200) {
      const userData = response.data;
      const userRole = userData.user.role;
      const userID = userData.user.id;

      const expiration = Date.now() + EXPIRATION_TIME;

      await AsyncStorage.setItem("userEmail", email);
      await AsyncStorage.setItem("userPassword", password);
      await AsyncStorage.setItem("userRole", userRole);
      await AsyncStorage.setItem("userId", userID);
      await AsyncStorage.setItem("expiration", expiration.toString());

      return { userData, userRole };
    }
  } catch (error) {
    throw error.response ? error.response.data : new Error("Login failed");
  }
};
