import React from "react";
import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Weather Trend Analyzer</div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <a href="/comparison" className="nav-link">
            Comparison
          </a>
        </li>
        <li className="nav-item">
          <a href="/humidity" className="nav-link">
            Humidity Simulation
          </a>
        </li>
        <li className="nav-item">
          <a href="/rainfall-prediction" className="nav-link">
            Rainfall Prediction
          </a>
        </li>
        {/* Add more navigation items as needed */}
      </ul>
    </nav>
  );
}

export default Navbar;
