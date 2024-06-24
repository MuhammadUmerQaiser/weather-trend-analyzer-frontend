import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Weather Trend Analyzer</div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink
            to="/comparison"
            className="nav-link"
            activeClassName="active"
          >
            Comparison
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/parametric-simulation"
            className="nav-link"
            activeClassName="active"
          >
            Parametric Simulation
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/rainfall-prediction"
            className="nav-link"
            activeClassName="active"
          >
            Rainfall Prediction
          </NavLink>
        </li>
        {/* Add more navigation items as needed */}
      </ul>
    </nav>
  );
}

export default Navbar;
