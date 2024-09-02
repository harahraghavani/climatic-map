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
  List,
  ListItem,
  Text,
  keyframes,
} from "@chakra-ui/react";
import WeatherCard from "../components/WeatherCard";
import { CiSearch } from "react-icons/ci";
import { MdGpsFixed } from "react-icons/md";
import LoadingWeatherAnimation from "../components/LoadingWeatherAnimation";
import { API } from "../api";
import { API_ENDPOINTS } from "../constants/apiEndPoints";
import backgroundImage from "../assets/Background.jpg";
import CountryFlag from "../components/CountryFlag";
import EnableLocationAnimation from "../components/EnableLocationAnimation";
import { FaLongArrowAltUp } from "react-icons/fa";
import { useEffect, useState } from "react";

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

  const [showButton, setShowButton] = useState(false);

  const rainbowGradient = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        // Adjust this value based on when you want the button to appear
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
        <Flex
          justifyContent="center"
          alignItems="center"
          height="100vh"
          width="100%"
          direction="column"
        >
          <EnableLocationAnimation />
          <Text
            textAlign="center"
            fontSize={{
              base: "md",
              sm: "lg",
            }}
            fontWeight="medium"
            color="gray.700"
            mt={4}
            lineHeight="tall"
            maxW="80%"
          >
            To provide a personalized experience,
            <br />
            please enable location services.
          </Text>
        </Flex>
      ) : position && markerPosition ? (
        <Box backgroundImage={`url(${backgroundImage})`} position="relative">
          <Grid mx="auto" justifyContent="center" alignItems="center" py={5}>
            <GridItem justifySelf="center">
              <Flex justifyContent="center" alignItems="center" gap={2}>
                <InputGroup position="relative" zIndex={9}>
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
                  />
                </Box>
              </GridItem>
            </Grid>
          </Box>
          {showButton && (
            <Box
              position="fixed"
              bottom="25px"
              right="25px"
              zIndex={999999999}
              display={{ base: "block", md: "sm" }}
              width={"fit-content"}
            >
              <IconButton
                icon={<FaLongArrowAltUp />}
                rounded="full"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                sx={{
                  background:
                    "linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00bfff, #ff69b4, #800080)",
                  backgroundSize: "400% 400%",
                  animation: `${rainbowGradient} 10s ease infinite`,
                  border: "none",
                  color: "white",
                  _hover: {
                    bg: "transparent",
                    color: "black",
                  },
                }}
              />
            </Box>
          )}
        </Box>
      ) : null}
    </div>
  );
};

export default Home;
