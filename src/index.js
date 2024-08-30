import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { WeatherProvider } from "./context/WeatherContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <WeatherProvider>
      <App />
    </WeatherProvider>
  </ChakraProvider>
);
