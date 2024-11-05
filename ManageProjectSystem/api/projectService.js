import axios from "axios";
import URL from "../midleware/authMidleware";

const BASE_URL = `http://${URL.BASE_URL}:5000/api/auth`;

export const createProject = async (projectData) => {
  try {
    const response = await axios.post(`${BASE_URL}/addProject`, projectData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const fetchProjects = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/projects`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const fetchProjectById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/projectsById/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteProjectById = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/deleteProject/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const editProjectById = async (id, updatedProject) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/updateProject/${id}`,
      updatedProject
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const getStatusSummary = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/project/status-summary`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
