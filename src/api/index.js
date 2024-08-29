import { axiosInstance } from "./apiInstance";

export const API = async ({ endpoint, params = {} }) => {
  try {
    const response = await axiosInstance({
      url: `${endpoint}`, // Use the endpoint here
      params: {
        ...params,
        appid: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error?.message);
    throw error;
  }
};
