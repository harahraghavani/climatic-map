import { useEffect, useState } from "react";

export const useGetCurrentPosition = () => {
  const [position, setPosition] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const successCallBack = (position) => {
      const { latitude, longitude } = position.coords;
      setPosition({ lat: latitude, long: longitude });
      setMarkerPosition([latitude, longitude]);
      setIsLoading(false);
      setError(error);
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
  }, []);

  return { position, markerPosition, isLoading, error };
};
