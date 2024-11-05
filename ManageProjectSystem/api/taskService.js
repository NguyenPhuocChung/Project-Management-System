import axios from "axios";
import URL from "../midleware/authMidleware";

const BASE_URL = `http://${URL.BASE_URL}:5000/api/auth`;

export const createTask = async (taskData) => {
  try {
    const response = await axios.post(`${BASE_URL}/addTask`, taskData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const fetchTask = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/tasks`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
//
export const fetchTaskByID = async (tasksId) => {
  try {
    const response = await axios.get(`${BASE_URL}/taskById/${tasksId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const deleteTaskById = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/deleteTask/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const editTaskById = async (id, updatedTask) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/updateTask/${id}`,
      updatedTask
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const fetchTaskByIdProject = async (projectId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/taskByIdProject/${projectId}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const updateProjectStatus = async (taskId, newStatus) => {
  try {
    const response = await axios.put(`${BASE_URL}/project/${taskId}/status`, {
      status: newStatus, // Gửi status mới trong body
    });

    console.log("Task updated successfully:", response.data);
    return response.data; // Trả về task đã cập nhật
  } catch (error) {
    console.error(
      "Error updating task status:",
      error,
      `${BASE_URL}/project/${taskId}/status`,
      {
        status: newStatus, // Gửi status mới trong body
      }
    );
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm
  }
};
export const updateTaskStatus = async (taskId, newStatus) => {
  try {
    const response = await axios.put(`${BASE_URL}/task/${taskId}/status`, {
      status: newStatus, // Gửi status mới trong body
    });

    console.log("Task updated successfully:", response.data);
    return response.data; // Trả về task đã cập nhật
  } catch (error) {
    console.error("Error updating task status:", error);

    throw error; // Ném lỗi để xử lý ở nơi gọi hàm
  }
};
export const getStatusSummary = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/task/status-summary`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
// Sử dụng hàm
