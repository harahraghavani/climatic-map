import { Marker } from "react-leaflet";
import CustomIcon from "./CustomMarker";
import { useReloacateLocation } from "../hooks/useReloacateLocation";
import { useGetCurrentPosition } from "../hooks/useGetCurrentPosition";

const CurrentLocationMarker = () => {
  const { markerPosition } = useGetCurrentPosition();
  const { handleRelocate } = useReloacateLocation({
    position: markerPosition,
  });

  return (
    <Marker
      position={markerPosition}
      eventHandlers={{ click: handleRelocate }}
      icon={CustomIcon}
    ></Marker>
  );
};

export default CurrentLocationMarker;
