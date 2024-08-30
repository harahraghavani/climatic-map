import { Box } from "@chakra-ui/react";
import React from "react";
import ReactCountryFlag from "react-country-flag";

const CountryFlag = ({ countryCode }) => {
  return (
    <Box mr={2}>
      <ReactCountryFlag countryCode={countryCode} />
    </Box>
  );
};

export default CountryFlag;
