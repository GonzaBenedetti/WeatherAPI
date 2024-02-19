import { useState, useRef } from "react";
import WeatherItems from "../WeatherItems/WeatherItems";
import "./WeatherContainer.css";

const WeatherContainer = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const kelvinToCelsius = (temp) => {
    return parseInt(temp - 273.15);
  };

  const fetchWeatherData = async () => {
    setLoading(true);
    const apiId = "381bf01d018e0b6cae760afb80ce8841";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiId}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod === "404") {
        throw new Error("The entered city is not valid");
      }

      const {
        name,
        main: { temp, temp_min, temp_max },
        weather,
      } = data;
      setWeatherData({ name, main: { temp, temp_min, temp_max }, weather });
      setError("");
      setInput("");
      inputRef.current.focus();
    } catch (error) {
      setError(
        "There was an error processing your request. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const submitFormWeather = (e) => {
    e.preventDefault();
    if (!input.trim()) {
      setError("Please enter a city");
      return;
    }
    fetchWeatherData();
  };

  return (
    <>
      <nav className="navContainer">
        <form className="formWeather" onSubmit={submitFormWeather}>
          <label htmlFor="weatherSearch"></label>
          <input
            type="text"
            name="weatherSearch"
            id="weatherSearch"
            placeholder="Search for a city"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            ref={inputRef}
          />
          <button disabled={loading}>
            <i
              className={`bx ${
                loading ? "bx-loader-alt bx-spin" : "bx-search"
              }`}
            ></i>
          </button>
        </form>
        {error && <p>Error: {error}</p>}
        {loading && <p>Loading...</p>}
      </nav>
      <section className="ContainerWeather">
        {weatherData && (
          <WeatherItems
            weatherData={weatherData}
            kelvinToCelsius={kelvinToCelsius}
          />
        )}
      </section>
    </>
  );
};

export default WeatherContainer;
