import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { CssBaseline, GeistProvider } from "@geist-ui/core";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GeistProvider>
    <CssBaseline />
    <App />
  </GeistProvider>
);
