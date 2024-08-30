import { useCallback } from "react";
import { useMap } from "react-leaflet";
import { INITIAL_ZOOM_LEVEL } from "../constants/constant";

export const useReloacateLocation = () => {
  const map = useMap();

  const flyToLocation = useCallback(
    (position) => {
      if (position) {
        map.flyTo(position, INITIAL_ZOOM_LEVEL, {
          animate: true,
          duration: 1, // Duration of the zoom in seconds
          easeLinearity: 0.3,
        });
      }
    },
    [map]
  );

  const setViewLocation = useCallback(
    (position) => {
      if (position) {
        const currentZoom = map.getZoom();
        if (currentZoom <= 0) {
          map.setView(position, currentZoom + 7, {
            animate: true,
            duration: 1, // Duration of the zoom in seconds
            easeLinearity: 0.25,
          });
        } else if (currentZoom >= 6) {
          map.setView(position, currentZoom + 3, {
            animate: true,
            duration: 1, // Duration of the zoom in seconds
            easeLinearity: 0.25,
          });
        } else if (currentZoom >= 12) {
          map.setView(position, currentZoom + 3, {
            animate: true,
            duration: 1, // Duration of the zoom in seconds
            easeLinearity: 0.25,
          });
        } else {
          map.setView(position, currentZoom + 3, {
            animate: true,
            duration: 1, // Duration of the zoom in seconds
            easeLinearity: 0.25,
          });
        }
      }
    },
    [map]
  );

  return { flyToLocation, setViewLocation };
};
