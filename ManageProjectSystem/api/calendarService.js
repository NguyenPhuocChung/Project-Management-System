import axios from "axios";
import URL from "../midleware/authMidleware";

const BASE_URL = `http://${URL.BASE_URL}:5000/api/auth`;

export const fetchCalendarData = async (date) => {
  try {
    const response = await axios.get(`${BASE_URL}/calendering/${date}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const fetchCalendar = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getAllCalendering`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteCalendarData = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/deleteCalendaring/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCalendarData = async (id, data) => {
  console.log("====================================");
  console.log(id, data);
  console.log("====================================");
  try {
    const response = await axios.put(
      `${BASE_URL}/updateCalendaring/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
