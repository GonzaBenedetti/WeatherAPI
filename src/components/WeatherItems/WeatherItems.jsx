import PropTypes from "prop-types";
import "./WeatherItems.css";

const WeatherItems = ({ weatherData, kelvinToCelsius }) => {
  const {
    name,
    main: { temp, temp_min, temp_max },
    weather,
  } = weatherData;
  const iconWeather = weather[0].icon;

  return (
    <>
      <article className="articleWeather">
        <h2>{name}</h2>
        <img
          src={`https://openweathermap.org/img/wn/${iconWeather}@2x.png`}
          alt="Weather Icon"
        />
        <h3>
          <span>{kelvinToCelsius(temp)}°</span>
        </h3>
        <div>
          <p>
            Max: <span>{kelvinToCelsius(temp_min)}°</span>
          </p>
          <p>
            Min: <span>{kelvinToCelsius(temp_max)}°</span>
          </p>
        </div>
      </article>
      <article>
        
      </article>
    </>
  );
};

WeatherItems.propTypes = {
  weatherData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    main: PropTypes.shape({
      temp: PropTypes.number.isRequired,
      temp_min: PropTypes.number.isRequired,
      temp_max: PropTypes.number.isRequired,
    }).isRequired,
    weather: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  kelvinToCelsius: PropTypes.func.isRequired,
};

export default WeatherItems;
