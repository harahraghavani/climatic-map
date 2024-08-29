import { useGetCurrentPosition } from "../hooks/useGetCurrentPosition";
import { Grid, Input, Spinner } from "@geist-ui/core";
import { CiSearch } from "react-icons/ci";
import { usePlacesWidget } from "react-google-autocomplete";
import Map from "../components/Map";

const Home = () => {
  const {
    position,
    isLoading,
    error,
    markerPosition,
    setMarkerPosition,
    setPosition,
    setIsSearched,
    isSearched,
    getCurrentPosition,
    setIsCleared,
    isCleared,
    weatherData,
  } = useGetCurrentPosition();

  const { ref } = usePlacesWidget({
    apiKey: process.env.REACT_APP_GOOGLE_AUTOCOMPLETE_API_KEY,
    onPlaceSelected: (place) => handleSearchPlace(place),
    options: {
      types: ["(regions)"],
    },
  });

  const handleSearchPlace = (place) => {
    setIsSearched(true);
    setIsCleared(false);
    if (place) {
      const lat = place.geometry.location.lat();
      const long = place.geometry.location.lng();
      setPosition({ lat, long });
      const newMarkerPosition = [lat, long];
      setMarkerPosition(newMarkerPosition);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner scale={3} />
        </div>
      ) : error ? (
        <p>Please enable location services to access the map.</p>
      ) : position && markerPosition ? (
        <>
          <Grid.Container
            justify="center"
            alignItems="center"
            style={{
              width: "100%",
              height: "70px",
            }}
          >
            <Grid style={{ width: "30%" }}>
              <Input
                ref={ref}
                scale={1.3}
                width="100%"
                placeholder="search any location"
                iconRight={<CiSearch />}
                clearable
                onClearClick={() => {
                  setIsCleared(true);
                  setIsSearched(false);
                  getCurrentPosition();
                }}
              />
            </Grid>
          </Grid.Container>
          <div
            style={{
              width: "100vw",
              height: "70vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Map
              marker={markerPosition}
              isSearched={isSearched}
              isCleared={isCleared}
              weatherData={weatherData}
            />
            {weatherData &&
              weatherData?.weather?.map((data) => {
                return (
                  <img
                    src={`http://openweathermap.org/img/w/${data.icon}.png`}
                  />
                );
              })}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Home;
