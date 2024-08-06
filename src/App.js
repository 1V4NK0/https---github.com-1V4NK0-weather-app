import React, { useState } from "react";
import "./index.css";

export default function App() {
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState(0);
  const [img, setImg] = useState("");
  const [condition, setCondition] = useState("");
  const [forecast, setForecast] = useState([]);
  const [displayCity, setDisplayCity] = useState(""); // State to store the city name to display

  const getWeather = async (city) => {
    const myAPI = "493f55f24ef948d6906151046242807";

    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${myAPI}&q=${city}&days=6&aqi=no&alerts=no`
      );
      const data = await response.json();
      setTemp(data.current.temp_c);
      setImg(data.current.condition.icon);
      setCondition(data.current.condition.text);
      setForecast(data.forecast.forecastday.slice(1, 6));
      setDisplayCity(city); // Update the displayCity state
    } catch (e) {
      alert(city + " not found");
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    getWeather(city);
  }

  return (
    <div className="app">
      <Search onSubmit={handleSubmit} city={city} setCity={setCity} />
      <Current temp={temp} img={img} condition={condition} city={displayCity} />
      <Forecast forecast={forecast}/>
    </div>
  );
}

function Search({ onSubmit, city, setCity }) {
  return (
    <form className="search-container" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="City"
        required
        minLength={3}
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button className="search-btn">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>
  );
}

function Current({ temp, img, city, condition }) {
  return (
    <div className="curr-container">
      <h3>{temp}°C</h3>
      <img src={img} alt="" className="currImg"/>
      <h4>{city}</h4>
      <h6>{condition}</h6>
    </div>
  );
}

function Forecast({ forecast }) {
  return (
    <div className="forecast-cont">
      {forecast.map((day, index) => (
        <ForecastForDay
          key={index}
          temp={day.day.avgtemp_c}
          condition={day.day.condition.text}
          img={day.day.condition.icon}
        />
      ))}
    </div>
  );
}

function ForecastForDay({ temp, condition, img }) {
  return (
    <div className="day">
      <h4>{temp}°C</h4>
      <img src={img} alt="" />
      <h6>{condition}</h6>
    </div>
  );
}
