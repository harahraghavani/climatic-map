import L from "leaflet";
import customMarkerImage from "../assets/Location.png";

const CustomIcon = L.icon({
  iconUrl: customMarkerImage,
  iconSize: [35, 35],
  iconAnchor: [10, 10],
  popupAnchor: [0, -10],
  crossOrigin: true,
});

export default CustomIcon;
