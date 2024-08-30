import { useGetCurrentPosition } from "../hooks/useGetCurrentPosition";
import Map from "../components/Map";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Tooltip,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import WeatherCard from "../components/WeatherCard";
import { CiSearch } from "react-icons/ci";
import { MdGpsFixed } from "react-icons/md";
import LoadingWeatherAnimation from "../components/LoadingWeatherAnimation";
import { API } from "../api";
import { API_ENDPOINTS } from "../constants/apiEndPoints";
import backgroundImage from "../assets/Background.jpg";
import CountryFlag from "../components/CountryFlag";

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
    setIsCleared,
    isCleared,
    weatherData,
    searchedVal,
    setSearchedVal,
    suggestions,
    setSuggestions,
    setWeatherData,
    isBtnClicked,
    setIsBtnClicked,
    isSearchLoading,
    setIsSearchLoading,
  } = useGetCurrentPosition();

  const handleSearchPlace = async () => {
    setIsSearchLoading(true);
    try {
      if (searchedVal !== "") {
        const response = await API({
          endpoint: API_ENDPOINTS.FIND,
          getLatAndLon: true,
          baseURL: process.env.REACT_APP_OPEN_WEATHER_BASE_URL,
          params: { q: searchedVal?.trim() },
        });

        setIsBtnClicked(true);
        const locations = response.list || [];
        setSuggestions(locations);
      }
    } catch (error) {
      setIsSearchLoading(false);
    }
    setIsSearchLoading(false);
  };

  const handleSelectSuggestion = (location) => {
    if (location) {
      setIsSearched(true);
      setIsCleared(false);
      setWeatherData(location);
      const { lat, lon } = location.coord;
      setPosition({ lat, long: lon });
      const newMarkerPosition = [lat, lon];
      setMarkerPosition(newMarkerPosition);
      setSuggestions([]);
      setSearchedVal(location.name);
      setIsBtnClicked(false);
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
          <LoadingWeatherAnimation />
        </div>
      ) : error ? (
        <p>Please enable location services to access the map.</p>
      ) : position && markerPosition ? (
        <Box backgroundImage={`url(${backgroundImage})`}>
          <Grid mx="auto" justifyContent="center" alignItems="center" py={5}>
            <GridItem justifySelf="center">
              <Flex justifyContent="center" alignItems="center" gap={2}>
                <InputGroup position="relative">
                  <InputLeftElement pointerEvents="none">
                    <CiSearch color="white" />
                  </InputLeftElement>
                  <Input
                    type="text"
                    placeholder="search any location"
                    onChange={(e) => {
                      setSearchedVal(e.target.value);
                      if (e.target.value === "") setIsBtnClicked(false);
                    }}
                    value={searchedVal}
                    _placeholder={{ color: "white" }}
                    color="white"
                    _focusVisible={{
                      borderColor: "white",
                    }}
                    bg="rgba(255, 255, 255, 0.1)"
                    backdropFilter="blur(20px)"
                  />
                  {suggestions.length > 0 ? (
                    <List
                      position="absolute"
                      top="100%"
                      left={0}
                      right={0}
                      zIndex={9999}
                      borderRadius="md"
                      color="white"
                      mt={3}
                      border="1px solid"
                      borderColor="rgba(255, 255, 255, 0.18)"
                      bg="rgba(255, 255, 255, 0.1)" // semi-transparent background
                      backdropFilter="blur(20px)" // adds the glass effect
                      boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)" // subtle shadow for depth
                    >
                      {suggestions.map((location) => (
                        <ListItem
                          key={location.id}
                          p={2}
                          _hover={{
                            cursor: "pointer",
                            bg: "rgba(255, 255, 255, 0.2)",
                          }}
                          onClick={() => handleSelectSuggestion(location)}
                        >
                          <Flex>
                            <CountryFlag countryCode={location.sys.country} />
                            <Box>
                              {location.name}, {location.sys.country}
                            </Box>
                          </Flex>
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    isBtnClicked && (
                      <Box
                        position="absolute"
                        top="100%"
                        left={0}
                        right={0}
                        zIndex={9999}
                        borderRadius="md"
                        mt={3}
                        p={2}
                        color="white"
                        border="1px solid"
                        borderColor="rgba(255, 255, 255, 0.18)"
                        bg="rgba(255, 255, 255, 0.1)" // semi-transparent background
                        backdropFilter="blur(20px)" // adds the glass effect
                        boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)" // subtle shadow for depth
                      >
                        <Text> No result found</Text>
                      </Box>
                    )
                  )}
                </InputGroup>
                <Tooltip label="click to search" fontSize="sm">
                  <IconButton
                    isLoading={isSearchLoading}
                    icon={<MdGpsFixed />}
                    variant="outline"
                    _hover={{ bg: "transparent" }}
                    onClick={handleSearchPlace}
                    color={"white"}
                    bg="rgba(255, 255, 255, 0.1)"
                    backdropFilter="blur(20px)"
                    _focusVisible={{
                      borderColor: "white",
                    }}
                  />
                </Tooltip>
              </Flex>
            </GridItem>
          </Grid>
          <Box>
            <Grid
              templateColumns={{
                base: "repeat(1, 1fr)",
                lg: "repeat(2, 1fr)",
              }}
              mx="auto"
              justifyContent="center"
              alignItems="center"
              gap={4}
              p={5}
            >
              <GridItem>
                <WeatherCard />
              </GridItem>
              <GridItem>
                <Box
                  height="calc(100vh - 120px)"
                  borderRadius="10px"
                  overflow="hidden"
                  position="relative"
                  zIndex={99}
                >
                  <Map
                    marker={markerPosition}
                    isSearched={isSearched}
                    isCleared={isCleared}
                    weatherData={weatherData}
                  />
                </Box>
              </GridItem>
            </Grid>
          </Box>
        </Box>
      ) : null}
    </div>
  );
};

export default Home;
