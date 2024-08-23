import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import CurrentLocationMarker from "./CurrentLocationMarker";
import { INITIAL_ZOOM_LEVEL } from "../constants/constant";
import { useGetCurrentPosition } from "../hooks/useGetCurrentPosition";

const Map = () => {
  const { markerPosition } = useGetCurrentPosition();

  return (
    <MapContainer
      center={markerPosition}
      zoom={INITIAL_ZOOM_LEVEL}
      scrollWheelZoom={true}
      style={{ width: "100%", height: "100%" }}
      zoomAnimation={true}
      zoomControl={false}
      markerZoomAnimation={true}
      trackResize={true}
      fadeAnimation={true}
      inertia={true}
      inertiaDeceleration={3400}
      inertiaMaxSpeed={10000}
      easeLinearity={0.25}
    >
      <TileLayer
        attribution=""
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CurrentLocationMarker />
    </MapContainer>
  );
};

export default Map;
