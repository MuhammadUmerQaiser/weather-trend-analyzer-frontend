import React, { useMemo, useState } from "react";
import { ApiService } from "../services/api.service";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "../styles/weather-comparison.css"; // Import CSS for styling
import Navbar from "../components/Navbar";

// Register required components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend
);

const WeatherComparison = () => {
  const [urbanData, setUrbanData] = useState(null);
  const [ruralData, setRuralData] = useState(null);
  const [selectedUrbanArea, setSelectedUrbanArea] = useState("");
  const [selectedRuralArea, setSelectedRuralArea] = useState("");
  const [barChartData, setBarChartData] = useState(null);
  const [currentBarChartData, setCurrentBarChartData] = useState(null);
  const apiService = useMemo(() => new ApiService(), []);

  const fetchWeatherData = async () => {
    try {
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/weather-comparison`;
      const response = await apiService.postData(endpoint, {
        rural: selectedRuralArea,
        urban: selectedUrbanArea,
      });

      setUrbanData(response.data.urban);
      setRuralData(response.data.rural);

      // Prepare data for bar chart
      const barLabels = [
        "Temperature",
        "Humidity",
        "Wind Speed",
        "Pressure",
        "Feels Like",
        "Rainfall",
      ]; // Add more as needed
      const barUrbanValues = [
        { label: "Temperature", value: response.data.urban.temp_c },
        { label: "Humidity", value: response.data.urban.humidity },
        { label: "Wind Speed", value: response.data.urban.wind_kph },
        { label: "Pressure", value: response.data.urban.pressure_in },
        { label: "Feels Like", value: response.data.urban.feelslike_c },
        { label: "Rainfall", value: response.data.urban.precip_mm },
      ];
      const barRuralValues = [
        { label: "Temperature", value: response.data.rural.temp_c },
        { label: "Humidity", value: response.data.rural.humidity },
        { label: "Wind Speed", value: response.data.rural.wind_kph },
        { label: "Pressure", value: response.data.rural.pressure_in },
        { label: "Feels Like", value: response.data.rural.feelslike_c },
        { label: "Rainfall", value: response.data.rural.precip_mm },
      ];

      const currentBarUrbanValues = [
        { label: "Temperature", value: response.data.current.urban.temp_c },
        { label: "Humidity", value: response.data.current.urban.humidity },
        { label: "Wind Speed", value: response.data.current.urban.wind_kph },
        { label: "Pressure", value: response.data.current.urban.pressure_in },
        { label: "Feels Like", value: response.data.current.urban.feelslike_c },
        { label: "Rainfall", value: response.data.current.urban.precip_mm },
      ];
      const currentBarRuralValues = [
        { label: "Temperature", value: response.data.current.rural.temp_c },
        { label: "Humidity", value: response.data.current.rural.humidity },
        { label: "Wind Speed", value: response.data.current.rural.wind_kph },
        { label: "Pressure", value: response.data.current.rural.pressure_in },
        { label: "Feels Like", value: response.data.current.rural.feelslike_c },
        { label: "Rainfall", value: response.data.current.rural.precip_mm },
      ];

      setBarChartData({
        labels: barLabels,
        datasets: [
          {
            label: `${selectedUrbanArea} Bar`,
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
            data: barUrbanValues.map((item) => item.value),
          },
          {
            label: `${selectedRuralArea} Bar`,
            backgroundColor: "rgba(255, 99, 132, 0.6)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
            data: barRuralValues.map((item) => item.value),
          },
        ],
      });

      setCurrentBarChartData({
        labels: barLabels,
        datasets: [
          {
            label: `${selectedUrbanArea} Bar`,
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
            data: currentBarUrbanValues.map((item) => item.value),
          },
          {
            label: `${selectedRuralArea} Bar`,
            backgroundColor: "rgba(255, 99, 132, 0.6)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
            data: currentBarRuralValues.map((item) => item.value),
          },
        ],
      });
    } catch (error) {
      console.error(`Error fetching weather data:`, error);
    }
  };

  const handleUrbanSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedUrbanArea(selectedValue);
  };

  const handleRuralSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedRuralArea(selectedValue);
  };

  return (
    <>
      <Navbar />
      <div className="weather-comparison-container">
        <h1>Weather Comparison</h1>
        <div className="select-area">
          <label>Select Urban Area:</label>
          <select value={selectedUrbanArea} onChange={handleUrbanSelectChange}>
            <option value="">Select an urban area</option>
            <option value="karachi">Karachi</option>
            <option value="lahore">Lahore</option>
            <option value="islamabad">Islamabad</option>
            <option value="Faisalabad">Faisalabad</option>
            <option value="Hyderabad">Hyderabad</option>
          </select>
        </div>
        <div className="select-area">
          <label>Select Rural Area:</label>
          <select value={selectedRuralArea} onChange={handleRuralSelectChange}>
            <option value="">Select a rural area</option>
            <option value="Muzaffarabad">Muzaffarabad</option>
            <option value="Abbottabad">Abbottabad</option>
            <option value="Murree">Murree</option>
            <option value="Skardu">Skardu</option>
          </select>
        </div>
        <button className="compare-btn" style={{
          background:"black"
        }} onClick={fetchWeatherData}>
          Compare
        </button>

        {currentBarChartData && (
          <div className="chart-container">
            <h3>Current Weather</h3>
            <Bar data={currentBarChartData} />
          </div>
        )}

        {/* Display bar chart */}
        {barChartData && (
          <div className="chart-container">
            <h3>Next Day Weather</h3>
            <Bar data={barChartData} />
          </div>
        )}
      </div>
    </>
  );
};

export default WeatherComparison;
