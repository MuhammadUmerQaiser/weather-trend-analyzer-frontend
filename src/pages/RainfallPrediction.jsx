import React, { useState, useMemo, useEffect } from "react";
import { ApiService } from "../services/api.service";
import Navbar from "../components/Navbar";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import "../styles/rainfall.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function RainfallPrediction() {
  const [params, setParams] = useState({
    city: "karachi",
  });
  const [results, setResults] = useState([]);
  const [currentWeather, setCurrentWeather] = useState({});
  const [chartData, setChartData] = useState({
    labels: ["1", "2"],
    datasets: [
      {
        label: "Rainfall (mm)",
        data: [1, 2],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  });
  const [chartData2, setChartData2] = useState({
    labels: ["1", "2"],
    datasets: [
      {
        label: "Rainfall (mm)",
        data: [1, 2],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  });
  const apiService = useMemo(() => new ApiService(), []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParams({
      ...params,
      [name]: value,
    });
  };

  const runSimulation = async () => {
    try {
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/monthly-rainfall-prediction`;
      const response = await apiService.postData(endpoint, params);

      console.log("Response Data:", response.data);
      setCurrentWeather(response.data.current);
      setChartData((prevChartData) => ({
        ...prevChartData,
        labels: response.data.data.map((result) => `Day ${result.day}`),
        datasets: [
          {
            ...prevChartData.datasets[0],
            data: response.data.data.map((result) => result.rainfall),
          },
        ],
      }));
      setChartData2((prevChartData) => ({
        ...prevChartData,
        labels: response.data.datasetData.map((result) => `Day ${result.day}`),
        datasets: [
          {
            ...prevChartData.datasets[0],
            data: response.data.datasetData.map((result) => result.rainfall),
          },
        ],
      }));
      setResults(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="rainfall-container">
        <h1 className="title">Monte Carlo Monthly Rainfall Prediction</h1>
        <div className="input-section">
          <div className="form-group">
            <label className="label">City:</label>
            <input
              type="text"
              name="city"
              value={params.city}
              onChange={handleChange}
              className="input"
            />
          </div>
          <button className="btn" onClick={runSimulation}>
            Run Simulation
          </button>
        </div>
        {currentWeather.condition && (
          <div className="current-weather">
            <h2 className="section-title">Current Weather</h2>
            <div className="weather-rain-info">
              <img
                src={currentWeather.condition.icon}
                alt="Weather Icon"
                className="weather-icon"
              />
              <p>{currentWeather.condition.text}</p>
              <p>Temperature: {currentWeather.temp_c}°C</p>
              <p>Humidity: {currentWeather.humidity}%</p>
              <p>Rainfall: {currentWeather.precip_mm} mm</p>
            </div>
          </div>
        )}
        <div className="results-section">
          <h2 className="section-title">Simulation Weather API Results</h2>
          {results.length > 0 ? (
            <Line
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  title: {
                    display: true,
                    text: "Monte Carlo Monthly Rainfall Prediction",
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: "Rainfall (mm)",
                    },
                  },
                  x: {
                    title: {
                      display: true,
                      text: "Days",
                    },
                  },
                },
              }}
            />
          ) : (
            <p>
              No simulation data available. Run the simulation to see results.
            </p>
          )}
        </div>

        <div className="results-section">
          <h2 className="section-title">Simulation Dataset Results</h2>
          {results.length > 0 ? (
            <Line
              data={chartData2}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  title: {
                    display: true,
                    text: "Monte Carlo Monthly Rainfall Prediction",
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: "Rainfall (mm)",
                    },
                  },
                  x: {
                    title: {
                      display: true,
                      text: "Days",
                    },
                  },
                },
              }}
            />
          ) : (
            <p>
              No simulation data available. Run the simulation to see results.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default RainfallPrediction;
