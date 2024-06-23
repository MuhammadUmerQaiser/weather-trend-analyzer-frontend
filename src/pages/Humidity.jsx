import React, { useEffect, useMemo, useState } from "react";
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
} from "chart.js";
import "../styles/humidity.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Monte Carlo Weather Simulation",
    },
  },
};

function Humidity() {
  const [params, setParams] = useState({
    days: 10,
    city: "karachi",
  });
  const [currentWeather, setCurrentWeather] = useState({
    temperature: null,
    humidity: null,
    condition: null,
    feelslike_c: null,
  });
  const [results, setResults] = useState([]);
  const [chartData, setChartData] = useState([
    {
      labels: [],
      datasets: [
        {
          label: "Temperature (°C)",
          data: [],
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.2)",
          fill: true,
        },
        {
          label: "Humidity (%)",
          data: [],
          borderColor: "rgba(153,102,255,1)",
          backgroundColor: "rgba(153,102,255,0.2)",
          fill: true,
        },
      ],
    },
    {
      labels: [],
      datasets: [
        {
          label: "Temperature (°C)",
          data: [],
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.2)",
          fill: true,
        },
        {
          label: "Feels Like (°C)",
          data: [],
          borderColor: "rgba(153,102,255,1)",
          backgroundColor: "rgba(153,102,255,0.2)",
          fill: true,
        },
      ],
    },
    {
      labels: [],
      datasets: [
        {
          label: "Temperature (°C)",
          data: [],
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.2)",
          fill: true,
        },
        {
          label: "Rainfall (mm)",
          data: [],
          borderColor: "rgba(153,102,255,1)",
          backgroundColor: "rgba(153,102,255,0.2)",
          fill: true,
        },
      ],
    },
    {
      labels: [],
      datasets: [
        {
          label: "Humidity (%)",
          data: [],
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.2)",
          fill: true,
        },
        {
          label: "Rainfall (mm)",
          data: [],
          borderColor: "rgba(153,102,255,1)",
          backgroundColor: "rgba(153,102,255,0.2)",
          fill: true,
        },
      ],
    },
    {
      labels: [],
      datasets: [
        {
          label: "Wind Speed (ms)",
          data: [],
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.2)",
          fill: true,
        },
        {
          label: "Temperature (°C)",
          data: [],
          borderColor: "rgba(153,102,255,1)",
          backgroundColor: "rgba(153,102,255,0.2)",
          fill: true,
        },
      ],
    },
    {
      labels: [],
      datasets: [
        {
          label: "Cloud Cover (%)",
          data: [],
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.2)",
          fill: true,
        },
        {
          label: "Visibility (miles)",
          data: [],
          borderColor: "rgba(153,102,255,1)",
          backgroundColor: "rgba(153,102,255,0.2)",
          fill: true,
        },
      ],
    },
    {
      labels: [],
      datasets: [
        {
          label: "Pressure (in)",
          data: [],
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.2)",
          fill: true,
        },
        {
          label: "Rainfall (mm)",
          data: [],
          borderColor: "rgba(153,102,255,1)",
          backgroundColor: "rgba(153,102,255,0.2)",
          fill: true,
        },
      ],
    },
    {
      labels: [],
      datasets: [
        {
          label: "Dew Point (°C)",
          data: [],
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.2)",
          fill: true,
        },
        {
          label: "Humidity (%)",
          data: [],
          borderColor: "rgba(153,102,255,1)",
          backgroundColor: "rgba(153,102,255,0.2)",
          fill: true,
        },
      ],
    },
    {
      labels: [],
      datasets: [
        {
          label: "Wind Speed (ms)",
          data: [],
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.2)",
          fill: true,
        },
        {
          label: "Rainfall (mm)",
          data: [],
          borderColor: "rgba(153,102,255,1)",
          backgroundColor: "rgba(153,102,255,0.2)",
          fill: true,
        },
      ],
    },
    {
      labels: [],
      datasets: [
        {
          label: "Cloud Cover (%)",
          data: [],
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.2)",
          fill: true,
        },
        {
          label: "Temperature (°C)",
          data: [],
          borderColor: "rgba(153,102,255,1)",
          backgroundColor: "rgba(153,102,255,0.2)",
          fill: true,
        },
      ],
    },
  ]);

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
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/humidity-calculation`;
      const response = await apiService.postData(endpoint, params);

      // Debug: log the response data to ensure it's correctly structured
      console.log("Response Data:", response.data);

      setCurrentWeather({
        temperature: response.data.current.temp_c,
        humidity: response.data.current.humidity,
        condition: response.data.current.condition,
        feelslike_c: response.data.current.feelslike_c,
      });

      // Update chart data
      const updatedChartData = chartData.map((chart, index) => ({
        ...chart,
        labels: response.data.data.map((result) => `Day ${result.day}`),
        datasets: [
          {
            ...chart.datasets[0],
            data:
              index === 0 || index === 1
                ? response.data.data.map((result) => result.temp)
                : index === 2
                ? response.data.data.map((result) => result.rainfall)
                : index === 4 || index === 8
                ? response.data.data.map((result) => result.wind)
                : index === 5 || index === 9
                ? response.data.data.map((result) => result.cloud)
                : index === 6
                ? response.data.data.map((result) => result.pressure)
                : index == 7
                ? response.data.data.map((result) => result.dew_point)
                : response.data.data.map((result) => result.humidity),
          },
          {
            ...chart.datasets[1],
            data:
              index === 1
                ? response.data.data.map((result) => result.feels_like)
                : index === 3 || index === 6 || index === 8
                ? response.data.data.map((result) => result.rainfall)
                : index === 4 || index === 9
                ? response.data.data.map((result) => result.temp)
                : index === 5
                ? response.data.data.map((result) => result.visibility)
                : response.data.data.map((result) => result.humidity),
          },
        ],
      }));

      setChartData(updatedChartData);
      setResults(response.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="humidity-container">
        <h1 className="title">Monte Carlo Weather Simulation</h1>
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
          <div className="form-group">
            <label className="label">Days:</label>
            <input
              type="number"
              name="days"
              value={params.days}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="form-group">
            <button className="btn" onClick={runSimulation}>
              Run Simulation
            </button>
          </div>
        </div>
        <div className="weather-section">
          <h2 className="section-title">Current Weather:</h2>
          <div className="weather-info">
            {currentWeather.condition && (
              <img
                src={currentWeather.condition.icon}
                alt="Weather Icon"
                className="weather-icon"
              />
            )}
            <p className="weather-text">
              {currentWeather.condition && currentWeather.condition.text}
            </p>
          </div>
          {currentWeather.temperature !== null && (
            <p className="weather-detail">
              Temperature: {currentWeather.temperature}°C
            </p>
          )}
          {currentWeather.feelslike_c !== null && (
            <p className="weather-detail">
              Temperature Feels Like: {currentWeather.feelslike_c}°C
            </p>
          )}
          {currentWeather.humidity !== null && (
            <p className="weather-detail">
              Humidity: {currentWeather.humidity}%
            </p>
          )}
        </div>

        {/* Render all charts dynamically */}
        {chartData.map((chart, index) => (
          <div key={index} className="results-section">
            <h2 className="section-title">Chart {index + 1}</h2>
            {results.length > 0 ? (
              <Line data={chart} options={chartOptions} />
            ) : (
              <p>
                No simulation data available. Run the simulation to see results.
              </p>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Humidity;
