import React from "react";
import "./current-weather.css";
//variabellen toewijzen
const CurrentWeather = ({ data }) => {
  const isNiceWeather = data.weather[0].main === "Clear";

  const weatherClass = isNiceWeather ? "nice-weather" : "bad-weather";
  const weatherIcon = `icons/${data.weather[0].icon}.png`;
  const temperature = `${Math.round(data.main.temp)}°C`;
  const feelsLike = `${Math.round(data.main.feels_like)}°C`;
  const windSpeed = `${data.wind.speed} m/s`;
  const humidity = `${data.main.humidity}%`;
  const pressure = `${data.main.pressure} hPa`;
//return statement voor api data
  return (
    <div className={`weather ${weatherClass}`}>
      <div className="top">
        <div>
          <p className="city">{data.city}</p>
          <p className="weather-description">{data.weather[0].description}</p>
        </div>
        <img alt="weather" className="weather-icon" src={weatherIcon} />
      </div>
      <div className="bottom">
        <p className="temperature">{temperature}</p>
        <div className="details">
          <div className="parameter-row">
            <span className="parameter-label">Details</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Voelt</span>
            <span className="parameter-value">{feelsLike}</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Wind</span>
            <span className="parameter-value">{windSpeed}</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Vochtigheid</span>
            <span className="parameter-value">{humidity}</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Druk</span>
            <span className="parameter-value">{pressure}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;