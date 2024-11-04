import axios from "axios";
import URL from "../midleware/authMidleware";

const BASE_URL = `http://${URL.BASE_URL}:5000/api/auth`;

export const fetchComment = async (idTask) => {
  try {
    const response = await axios.get(`${BASE_URL}/comment/${idTask}`);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const addComment = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/addComment`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
