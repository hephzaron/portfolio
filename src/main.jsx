import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import store from "./store";
import "./index.css";

/**
 * Entry Point
 * --------------------------------------------------
 * Bootstraps the React application.
 *
 * - Wraps the root component (<App />) with Redux <Provider>
 * - Enables React.StrictMode for highlighting potential issues
 * - Mounts the app into the DOM at #root
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
