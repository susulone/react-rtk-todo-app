import React from "react";
import ReactDOM from "react-dom/client";

// RTK
import { Provider } from "react-redux";
import { store } from "./app/store";

// Components
import App from "./app/App.tsx";

// Styling
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
);
