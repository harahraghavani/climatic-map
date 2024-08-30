import { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";

export const useGetCurrentPosition = () => useContext(WeatherContext);
