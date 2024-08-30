import { useGetCurrentPosition } from "../hooks/useGetCurrentPosition";
import { Flex, Text, Card, Grid } from "@chakra-ui/react";
import ReactAnimatedWeather from "react-animated-weather";
import { getWeatherIcon, timeStampToHours } from "../utils/utils";
import LoadingShimmerEffect from "./LoadingShimmerEffect";
import { CiLocationOn } from "react-icons/ci";
import { CiTempHigh } from "react-icons/ci";
import { WiHumidity } from "react-icons/wi";
import { FaEye } from "react-icons/fa";
import { PiWindLight } from "react-icons/pi";
import { PiSpeedometerLight } from "react-icons/pi";
import { FiSunrise, FiSunset } from "react-icons/fi";
import { BsClouds } from "react-icons/bs";

const WeatherCard = () => {
  const { weatherData, isWeatherLoading } = useGetCurrentPosition();

  return isWeatherLoading ? (
    <LoadingShimmerEffect />
  ) : weatherData ? (
    <Card
      p={6}
      borderRadius="lg"
      maxW="md"
      mx="auto"
      border="1px solid"
      borderColor="rgba(255, 255, 255, 0.18)"
      bg="rgba(255, 255, 255, 0.1)" // semi-transparent background
      backdropFilter="blur(20px)" // adds the glass effect
      boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)" // subtle shadow for depth
      color="white"
    >
      <Flex justify="space-between" align="center">
        <Flex
          justify="space-between"
          align="center"
          alignItems="center"
          gap={2}
        >
          <CiLocationOn size={28} color="white" />
          <Text fontSize="xl" fontWeight="bold" color="white">
            {weatherData.name}
          </Text>
        </Flex>
        <ReactAnimatedWeather
          icon={getWeatherIcon(weatherData.weather[0].main)}
          color="white"
          size={40}
          animate={true}
        />
      </Flex>
      <Flex direction="column" gap={4}>
        <Text fontSize="6xl" fontWeight="bold" mb={2}>
          {Math.round(weatherData.main.temp - 273.15)}
          <span style={{ fontSize: "1.7rem" }}>°C</span>
        </Text>
        <Grid
          templateColumns={{
            base: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          }}
          gap={4}
        >
          <Card
            p={3}
            borderRadius="xl"
            border="1px solid"
            borderColor="rgba(255, 255, 255, 0.18)"
            bg="rgba(255, 255, 255, 0.1)" // semi-transparent background
            backdropFilter="blur(20px)" // adds the glass effect
            boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)" // subtle shadow for depth
            color="white"
          >
            <CiTempHigh size={30} />
            <Text fontSize="sm" my={2}>
              Feels Like
            </Text>
            <Text fontSize="md" fontWeight="bold">
              {Math.round(weatherData.main.feels_like - 273.15)} °C
            </Text>
          </Card>
          <Card
            p={3}
            borderRadius="xl"
            border="1px solid"
            borderColor="rgba(255, 255, 255, 0.18)"
            bg="rgba(255, 255, 255, 0.1)" // semi-transparent background
            backdropFilter="blur(20px)" // adds the glass effect
            boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)" // subtle shadow for depth
            color="white"
          >
            <WiHumidity size={30} />
            <Text fontSize="sm" my={2}>
              Humidity
            </Text>
            <Text fontSize="md" fontWeight="bold">
              {weatherData.main.humidity} %
            </Text>
          </Card>
          <Card
            p={3}
            borderRadius="xl"
            border="1px solid"
            borderColor="rgba(255, 255, 255, 0.18)"
            bg="rgba(255, 255, 255, 0.1)" // semi-transparent background
            backdropFilter="blur(20px)" // adds the glass effect
            boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)" // subtle shadow for depth
            color="white"
          >
            <FaEye size={30} />
            <Text fontSize="sm" my={2}>
              Visibility
            </Text>
            <Text fontSize="md" fontWeight="bold">
              {weatherData.visibility / 1000} km
            </Text>
          </Card>
          <Card
            p={3}
            borderRadius="xl"
            border="1px solid"
            borderColor="rgba(255, 255, 255, 0.18)"
            bg="rgba(255, 255, 255, 0.1)" // semi-transparent background
            backdropFilter="blur(20px)" // adds the glass effect
            boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)" // subtle shadow for depth
            color="white"
          >
            <PiWindLight size={30} />
            <Text fontSize="sm" my={2}>
              Wind
            </Text>
            <Text fontSize="md" fontWeight="bold">
              {weatherData.wind.speed} km/h
            </Text>
          </Card>
          <Card
            p={3}
            borderRadius="xl"
            border="1px solid"
            borderColor="rgba(255, 255, 255, 0.18)"
            bg="rgba(255, 255, 255, 0.1)" // semi-transparent background
            backdropFilter="blur(20px)" // adds the glass effect
            boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)" // subtle shadow for depth
            color="white"
          >
            <PiSpeedometerLight size={30} />
            <Text fontSize="sm" my={2}>
              Air Pressure
            </Text>
            <Text fontSize="md" fontWeight="bold">
              {weatherData.main.pressure} hPa
            </Text>
          </Card>
          <Card
            p={3}
            borderRadius="xl"
            border="1px solid"
            borderColor="rgba(255, 255, 255, 0.18)"
            bg="rgba(255, 255, 255, 0.1)" // semi-transparent background
            backdropFilter="blur(20px)" // adds the glass effect
            boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)" // subtle shadow for depth
            color="white"
          >
            <FiSunrise size={30} />
            <Text fontSize="sm" my={2}>
              Sunrise
            </Text>
            <Text fontSize="md" fontWeight="bold">
              {timeStampToHours(weatherData.sys.sunrise)}
            </Text>
          </Card>
          <Card
            p={3}
            borderRadius="xl"
            border="1px solid"
            borderColor="rgba(255, 255, 255, 0.18)"
            bg="rgba(255, 255, 255, 0.1)" // semi-transparent background
            backdropFilter="blur(20px)" // adds the glass effect
            boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)" // subtle shadow for depth
            color="white"
          >
            <FiSunset size={30} />
            <Text fontSize="sm" my={2}>
              Sunset
            </Text>
            <Text fontSize="md" fontWeight="bold">
              {timeStampToHours(weatherData.sys.sunset)}
            </Text>
          </Card>
          <Card
            p={3}
            borderRadius="xl"
            border="1px solid"
            borderColor="rgba(255, 255, 255, 0.18)"
            bg="rgba(255, 255, 255, 0.1)" // semi-transparent background
            backdropFilter="blur(20px)" // adds the glass effect
            boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)" // subtle shadow for depth
            color="white"
          >
            <BsClouds size={30} />
            <Text fontSize="sm" my={2}>
              Cloudiness
            </Text>
            <Text fontSize="md" fontWeight="bold">
              {weatherData.clouds.all} %
            </Text>
          </Card>
        </Grid>
      </Flex>
    </Card>
  ) : null;
};

export default WeatherCard;
