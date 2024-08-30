import React from "react";
import Lottie from "lottie-react";
import LoadingAnimation from "../assets/WeatherLoadingAnimation.json";

const LoadingWeatherAnimation = () => {
  return <Lottie animationData={LoadingAnimation} loop={true} />;
};

export default LoadingWeatherAnimation;
