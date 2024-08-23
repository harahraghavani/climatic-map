import { useCallback } from "react";
import { useMap } from "react-leaflet";

export const useReloacateLocation = ({ position }) => {
  const map = useMap();
  const handleRelocate = useCallback(() => {
    const currentZoom = map.getZoom();
    if (position) {
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
  }, [position]);

  return { handleRelocate };
};
