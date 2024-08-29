import { useEffect } from "react";
import { Marker } from "react-leaflet";
import CustomIcon from "./CustomMarker";
import { useReloacateLocation } from "../hooks/useReloacateLocation";

const CurrentLocationMarker = ({ marker, isSearched, isCleared }) => {
  const { flyToLocation, setViewLocation } = useReloacateLocation();

  useEffect(() => {
    if (marker && isSearched) {
      flyToLocation(marker);
    }
  }, [marker, isSearched, flyToLocation]);

  useEffect(() => {
    if (marker && isCleared) {
      flyToLocation(marker);
    }
  }, [marker, isCleared, flyToLocation]);

  return (
    <Marker
      position={marker}
      eventHandlers={{ click: () => setViewLocation(marker) }}
      icon={CustomIcon}
    ></Marker>
  );
};

export default CurrentLocationMarker;
