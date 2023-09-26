import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "./forecast.css";

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Forecast = ({ data }) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));
  const [niceWeatherThreshold, setNiceWeatherThreshold] = useState("25");
  const [maxRainChanceThreshold, setMaxRainChanceThreshold] = useState(50);

  const handleThresholdChange = (e) => {
    setNiceWeatherThreshold(e.target.value);
  };

  const handleRainChanceThresholdChange = (e) => {
    setMaxRainChanceThreshold(e.target.value);
  };

  useEffect(() => {
    const savedThreshold = Cookies.get("niceWeatherThreshold");
    if (savedThreshold) {
      setNiceWeatherThreshold(savedThreshold);
    }
  }, []);

  useEffect(() => {
    Cookies.set("niceWeatherThreshold", niceWeatherThreshold);
  }, [niceWeatherThreshold]);

  const isNiceWeather = (item) => {
    return (
      item.main.temp_max >= niceWeatherThreshold &&
      item.main.temp_min >= niceWeatherThreshold &&
      (item.rain ? item.rain["1h"] : 0) <= maxRainChanceThreshold
    );
  };

  const dailyItems = data.list.splice(0, 7).map((item, idx) => (
    <AccordionItem key={idx}>
      <AccordionItemHeading>
        <AccordionItemButton>
          <div className={`daily-item ${isNiceWeather(item) ? 'nice-weather' : 'bad-weather'}`}>
            <img src={`icons/${item.weather[0].icon}.png`} className="icon-small" alt="weather" />
            <label className="day">{forecastDays[idx]}</label>
            <label className="description">{item.weather[0].description}</label>
            <label className="min-max">{Math.round(item.main.temp_max)}°C / {Math.round(item.main.temp_min)}°C</label>
            {isNiceWeather(item) ? (
              <p>Je kunt fietsen!</p>
            ) : (
              <h2 className="bad-weather-text">X</h2>
            )}
          </div>
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel>
        {/* ... */}
      </AccordionItemPanel>
    </AccordionItem>
  ));

  return (
    <>
      <label className="title">Fietsen of Auto?</label>
      <label className="thres">Threshold voor mooi weer:</label>
      <input
        type="number"
        value={niceWeatherThreshold}
        onChange={handleThresholdChange}
      />
      <label className="rain-thres">Threshold voor maximale regenkans:</label>
      <input
        type="number"
        value={maxRainChanceThreshold}
        onChange={handleRainChanceThresholdChange}
      />
      <Accordion allowZeroExpanded>
        {dailyItems}
      </Accordion>
    </>
  );
};

export default Forecast;
