import axios from "axios";
import { axiosInstance } from "./apiInstance";

export const API = async ({
  endpoint,
  params = {},
  getLatAndLon = false,
  baseURL,
}) => {
  try {
    const myApiInstance = getLatAndLon
      ? axios.create({ baseURL })
      : axiosInstance;
    const response = await myApiInstance({
      url: `${endpoint}`, // Use the endpoint here
      params: {
        ...params,
        appid: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
