// NotFound.js
import { Component } from "react";
import { Link } from "react-router-dom";

/**
 * NotFound
 * --------------------------------------------------
 * Fallback page displayed when a user navigates
 * to a route that does not exist.
 *
 * @remarks
 * Provides a simple 404-style message and a link
 * to return back to the home page.
 */
export class NotFound extends Component {
  /**
   * Render the not-found page
   *
   * @returns {JSX.Element} 404 error page with navigation link
   */
  render() {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h1>Oops! Page not found.</h1>
        <p>The page you&apos;re looking for does not exist.</p>
        <Link to="/" style={{ color: "#007BFF", textDecoration: "underline" }}>
          Go to Home
        </Link>
      </div>
    );
  }
}
