import React from "react";
import ReactDOM from "react-dom/client";

// Components
import App from "./app/App.tsx";

// Styling
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
