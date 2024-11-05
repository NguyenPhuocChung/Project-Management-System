import axios from "axios";
import URL from "../midleware/authMidleware";

const BASE_URL = `http://${URL.BASE_URL}:5000/api/auth`;

// Function to get all accounts
export const getAllAccounts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/allaccount`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to delete an account by ID
export const deleteAccount = async (accountId) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/deleteAccount/${accountId}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to fetch a specific account by ID
export const fetchAccount = async (id) => {
  console.log("====================================");
  console.log(id);
  console.log("====================================");
  try {
    const response = await axios.get(`${BASE_URL}/account/${id}`);
    return response.data;
  } catch (err) {
    // Ghi lại thông tin lỗi để kiểm tra
    console.error("Error fetching account:", {
      message: err.message,
      response: err.response ? err.response.data : "No response data",
      status: err.response ? err.response.status : "No status code",
    });

    // Ném lỗi với thông tin chi tiết hơn
    throw new Error(`Failed to fetch account: ${err.message}`);
  }
};

// Function to update an account by ID
export const updateAccount = async (id, updatedAccount) => {
  try {
    await axios.put(`${BASE_URL}/account/${id}`, updatedAccount);
  } catch (err) {
    throw new Error(err.message);
  }
};

// Function to upload avatar for an account
export const uploadAvatar = async (id, uri) => {
  const formData = new FormData();
  formData.append("avatar", {
    uri,
    name: "avatar.jpg",
    type: "image/jpeg",
  });

  try {
    const response = await axios.post(`${BASE_URL}/uploads/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.avatarPath;
  } catch (err) {
    throw new Error("Error uploading avatar: " + err.message);
  }
};
