// services/apiService.js
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";
import URL from "../midleware/authMidleware"; // Adjust the import as necessary

const BASE_URL = `http://${URL.BASE_URL}:5000/api/auth`;

// Function to get all accounts
export const getAllAccounts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/allaccount`);
    return response.data; // Return the data directly
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
    return response.data; // Return the result of the delete operation
  } catch (error) {
    throw new Error(error.message);
  }
};
/////////////////
export const createProject = async (projectData) => {
  try {
    const response = await axios.post(`${BASE_URL}/addProject`, projectData);
    return response.data; // Return the data from the response
  } catch (error) {
    throw new Error(error.message); // Throw error for handling in the calling component
  }
};

////////////////////////////////////////////////////////////////
export const createTask = async (taskData) => {
  try {
    const response = await axios.post(`${BASE_URL}/addTask`, taskData);
    return response.data; // Return the data from the response
  } catch (error) {
    throw new Error(error.message); // Throw error for handling in the calling component
  }
};
//
export const fetchTask = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/tasks`);
    return response.data; // Trả về dữ liệu trực tiếp
  } catch (error) {
    throw new Error(error.message); // Ném lỗi để xử lý trong component
  }
};
//
export const fetchTaskById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/taskById/${id}`); // Thay đổi URL theo API của bạn
    return response.data; // Trả về dữ liệu trực tiếp
  } catch (error) {
    throw new Error(error.message); // Ném lỗi để xử lý trong component
  }
};
export const fetchTaskByIdProject = async (projectId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/taskByIdProject/${projectId}`
    ); // Thay đổi URL theo API của bạn
    return response.data; // Trả về dữ liệu trực tiếp
  } catch (error) {
    throw new Error(error.message); // Ném lỗi để xử lý trong component
  }
};
export const fetchTaskByIdInvite = async (inviteId) => {
  try {
    const response = await axios.get(`${BASE_URL}/tasksByInvite/${inviteId}`); // Thay đổi URL theo API của bạn
    return response.data; // Trả về dữ liệu trực tiếp
  } catch (error) {
    throw new Error(error.message); // Ném lỗi để xử lý trong component
  }
};
//
export const deleteTaskById = async (id) => {
  try {
    console.log(id);

    const response = await axios.delete(`${BASE_URL}/deleteTask/${id}`); // Thay đổi URL theo API của bạn
    return response.data; // Trả về dữ liệu trực tiếp
  } catch (error) {
    throw new Error(error.message); // Ném lỗi để xử lý trong component
  }
};
////////////
export const editTaskById = async (id, updatedTask) => {
  try {
    console.log("edit", id, updatedTask);
    const response = await axios.put(
      `${BASE_URL}/updateTask/${id}`,
      updatedTask
    );
    return response.data; // Trả về dữ liệu trực tiếp
  } catch (error) {
    throw new Error(error.message); // Ném lỗi để xử lý trong component
  }
};
//
////////////////////////////////////////////////////////////////
export const fetchProjects = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/projects`); // Thay đổi URL theo API của bạn
    return response.data; // Trả về dữ liệu trực tiếp
  } catch (error) {
    throw new Error(error.message); // Ném lỗi để xử lý trong component
  }
};

export const fetchProjectById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/projectsById/${id}`); // Thay đổi URL theo API của bạn
    return response.data; // Trả về dữ liệu trực tiếp
  } catch (error) {
    throw new Error(error.message); // Ném lỗi để xử lý trong component
  }
};
//
export const fetchProjectByInvite = async (inviteId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/projectsByInvite/${inviteId}`
    ); // Thay đổi URL theo API của bạn
    return response.data; // Trả về dữ liệu trực tiếp
  } catch (error) {
    throw new Error(error.message); // Ném lỗi để xử lý trong component
  }
};
//
export const deleteProjectById = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/deleteProject/${id}`); // Thay đổi URL theo API của bạn
    return response.data; // Trả về dữ liệu trực tiếp
  } catch (error) {
    throw new Error(error.message); // Ném lỗi để xử lý trong component
  }
};
////////////
export const editProjectById = async (id, updatedProject) => {
  try {
    console.log("edit", id, updatedProject);
    const response = await axios.put(
      `${BASE_URL}/updateProject/${id}`,
      updatedProject
    );
    return response.data; // Trả về dữ liệu trực tiếp
  } catch (error) {
    throw new Error(error.message); // Ném lỗi để xử lý trong component
  }
};
//

export const registerUser = async (role, email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, {
      role,
      email,
      password,
    });

    return response; // Return the response for further handling in the component
  } catch (error) {
    throw error; // Throw the error to be caught in the component
  }
};
export const login = async (role, email, password) => {
  const data = { role, email, password };

  try {
    const response = await axios.post(`${BASE_URL}/login`, data);

    if (response.status === 200) {
      const userData = response.data;
      const userRole = userData.user.role;
      const userID = userData.user.id;

      // Lưu thông tin vào AsyncStorage
      await AsyncStorage.setItem("userEmail", email);
      await AsyncStorage.setItem("userPassword", password);
      await AsyncStorage.setItem("userRole", userRole);
      await AsyncStorage.setItem("userId", userID);

      return { userData, userRole };
    }
  } catch (error) {
    throw error.response ? error.response.data : new Error("Login failed");
  }
};
// //////
export const fetchAccount = async (id) => {
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

// Hàm cập nhật thông tin tài khoản
export const updateAccount = async (id, updatedAccount) => {
  try {
    await axios.put(`${BASE_URL}/account/${id}`, updatedAccount);
  } catch (err) {
    throw new Error(err.message);
  }
};

// Hàm upload avatar
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
    return response.data.avatarPath; // Đường dẫn của ảnh đã upload
  } catch (err) {
    throw new Error("Error uploading avatar: " + err.message);
  }
};
// ///////////////////
export const fetchCalendarData = async (date) => {
  console.log(date);
  try {
    const response = await axios.get(`${BASE_URL}/calendering/${date}`);
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error("Error fetching calendar data:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm
  }
};
//
export const fetchCalendar = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getAllCalendering`);
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error("Error fetching calendar data:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm
  }
};
// ////////////
export const fetchInviteMembers = async (userRole) => {
  try {
    const response = await axios.get(`${BASE_URL}/invitemember/${userRole}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching invite members:", error);
    throw error; // Ném lại lỗi để xử lý ở component
  }
};
//
export const deleteCalendarData = async (id) => {
  console.log(id);
  try {
    const response = await axios.delete(`${BASE_URL}/deleteCalendaring/${id}`);
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error("Error fetching calendar data:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm
  }
};
//
export const updateCalendarData = async (id, data) => {
  console.log(id, data);
  try {
    const response = await axios.put(
      `${BASE_URL}/updateCalendaring/${id}`,
      data
    );
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error("Error fetching calendar data:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm
  }
};
////////////////////////
export const addEvent = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/addCalendaring`, data);
    return response.data; // Trả về dữ liệu
  } catch {
    console.error("Error adding event:", error);
    throw error; // Ném l��i để xử lý ở component
  }
};
////////////////////////////////////////////////////////////////////
export const fetchComment = async (idTask) => {
  try {
    const response = await axios.get(`${BASE_URL}/comment/${idTask}`);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};
//

export const addComment = async (data) => {
  console.log("data", data); // Kiểm tra dữ liệu trước khi gửi

  try {
    const response = await axios.post(`${BASE_URL}/addComment`, data, {
      headers: {
        "Content-Type": "multipart/form-data", // Đặt headers phù hợp cho FormData
      },
    });
    return response.data; // Trả về dữ liệu nhận từ server
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error; // Ném lỗi để xử lý ở component
  }
};

////////////////////////////////////////////////////////////////////////////
