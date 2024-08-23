import React from "react";
import Map from "../components/Map";
import { useGetCurrentPosition } from "../hooks/useGetCurrentPosition";

const Home = () => {
  const { position, isLoading, error } = useGetCurrentPosition();

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isLoading ? (
        <div>Harsh</div>
      ) : error ? (
        <p>Please enable location services to access the map.</p>
      ) : position ? (
        <Map />
      ) : null}
    </div>
  );
};

export default Home;
