import React from "react";
import Lottie from "lottie-react";
import LocationAnimation from "../assets/LocationAnimation.json";

const EnableLocationAnimation = () => {
  return <Lottie animationData={LocationAnimation} loop={true} />;
};

export default EnableLocationAnimation;
