import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Humidity from "./pages/Humidity";
import WeatherComparison from "./pages/WeatherComparison";
import RainfallPrediction from "./pages/RainfallPrediction";

function WebRoute() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
            <Route path="/" exact Component={Humidity} />
            <Route path="/humidity" exact Component={Humidity} />
            <Route path="/comparison" exact Component={WeatherComparison} />
            <Route path="/rainfall-prediction" exact Component={RainfallPrediction} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default WebRoute;
