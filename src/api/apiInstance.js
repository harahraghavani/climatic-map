import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_OPEN_WEATHER_BASE_URL,
});
