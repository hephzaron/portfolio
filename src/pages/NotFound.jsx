// NotFound.js
import React from "react";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Oops! Page not found.</h1>
      <p>The page you're looking for does not exist.</p>
      <Link to="/" style={{ color: "#007BFF", textDecoration: "underline" }}>
        Go to Home
      </Link>
    </div>
  );
};
