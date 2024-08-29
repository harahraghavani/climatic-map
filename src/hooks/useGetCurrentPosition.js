import { useEffect, useState } from "react";
import { API } from "../api";

export const useGetCurrentPosition = () => {
  const [position, setPosition] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const [isCleared, setIsCleared] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  // Function to handle geolocation
  const getCurrentPosition = () => {
    const successCallBack = (position) => {
      const { latitude, longitude } = position.coords;
      setPosition({ lat: latitude, long: longitude });
      setMarkerPosition([latitude, longitude]);
      setIsLoading(false);
      setError(false);
    };

    const errorCallBack = (error) => {
      setError(true);
      setIsLoading(false);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallBack, errorCallBack);
    } else {
      setError(true);
      setIsLoading(false);
    }
  };

  const getWeatherData = async () => {
    if (position) {
      const response = await API({
        endpoint: "find",
        params: {
          lat: position.lat,
          lon: position.long,
        },
      });
      setWeatherData(response);
    }
  };

  useEffect(() => {
    getCurrentPosition();
  }, []);

  useEffect(() => {
    if (position) {
      getWeatherData();
    }
  }, [position]);

  return {
    position,
    markerPosition,
    isLoading,
    error,
    setMarkerPosition,
    setPosition,
    isSearched,
    setIsSearched,
    isCleared,
    setIsCleared,
    getCurrentPosition,
    weatherData,
    setWeatherData,
  };
};
