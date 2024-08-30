import { createContext, useEffect, useState } from "react";
import { API } from "../api";
import { API_ENDPOINTS } from "../constants/apiEndPoints";

const WeatherContext = createContext();

const WeatherProvider = ({ children }) => {
  const [position, setPosition] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const [isCleared, setIsCleared] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [isWeatherLoading, setIsWeatherLoading] = useState(false);
  const [searchedVal, setSearchedVal] = useState("");
  const [suggestions, setSuggestions] = useState([]); // State for location suggestions
  const [isBtnClicked, setIsBtnClicked] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  // Function to handle geolocation
  const getCurrentPosition = () => {
    const successCallBack = (position) => {
      const { latitude, longitude } = position.coords;
      setPosition({ lat: latitude, long: longitude });
      setMarkerPosition([latitude, longitude]);
      setIsLoading(false);
      setError(false);
    };

    const errorCallBack = () => {
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
    // if (searchedVal !== "") return;
    setIsWeatherLoading(true);

    if (position) {
      const response = await API({
        endpoint: API_ENDPOINTS.CURRENT_WEATHER,
        params: {
          lat: position.lat,
          lon: position.long,
        },
      });
      if (response.cod === 200) {
        setWeatherData(response);
      }
    }
    setIsWeatherLoading(false);
  };

  useEffect(() => {
    getCurrentPosition();
  }, []);

  useEffect(() => {
    if (position) {
      getWeatherData();
    }
    // eslint-disable-next-line
  }, [position]);

  const values = {
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
    isWeatherLoading,
    searchedVal,
    setSearchedVal,
    suggestions,
    setSuggestions,
    isBtnClicked,
    setIsBtnClicked,
    isSearchLoading,
    setIsSearchLoading,
    getWeatherData,
  };

  return (
    <WeatherContext.Provider value={values}>{children}</WeatherContext.Provider>
  );
};

export { WeatherContext, WeatherProvider };
