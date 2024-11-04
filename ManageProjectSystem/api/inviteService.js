import axios from "axios";
import URL from "../midleware/authMidleware";

const BASE_URL = `http://${URL.BASE_URL}:5000/api/auth`;

// Function to fetch invited members based on user role
export const fetchInviteMembers = async (userRole) => {
  try {
    const response = await axios.get(`${BASE_URL}/invitemember/${userRole}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching invite members:", error);
    throw error;
  }
};

// Function to fetch tasks by invite ID
export const fetchTaskByIdInvite = async (inviteId) => {
  try {
    const response = await axios.get(`${BASE_URL}/tasksByInvite/${inviteId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to fetch projects by invite ID
export const fetchProjectByInvite = async (inviteId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/projectsByInvite/${inviteId}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
