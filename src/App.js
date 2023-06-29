import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { FiSettings } from "react-icons/fi";
// import { FiDroplet } from 'react-icons/fi'
// import { BiCrosshair } from 'react-icons/bi'
// import { DiDigitalOcean } from 'react-icons/di'
// import moment from 'moment'
import "./App.css";

const api = {
  key: "4dbafd9a9f87402da7073200232306",
  // base: 'http://api.weatherapi.com/v1',

  // key: '6208212bf5957b440941d859e95aa543',
  // base: 'https://api.openweathermap.org/data/2.5/',
};
function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      // fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      fetch(
        `http://api.weatherapi.com/v1/current.json?key=${api.key}&q=${query}`
      )
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
    
  };
  return (
    <div className={typeof weather.current != "undefined" ? "app" : "app"}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Enter City Name"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          ></input>
        </div>
        <header>
          <div class="header-container">
            <div class="left-icons">
              <span class="icon">
                <FiMenu />
              </span>
            </div>
            {typeof weather.current != "undefined" ? (
              <h3>{weather.location.name}</h3>
            ) : (
              ""
            )}
            <div class="right-icons">
              <span class="icon">
                <FiSettings />
              </span>
            </div>
          </div>
        </header>
        {typeof weather.current != "undefined" ? (
          <div className="Box">
            <div className="LeftBox">
              <span>{Math.round(weather.current.temp_c)}&deg;c</span>
            </div>
            <div className="RightBox">
              <div className="Circle AirQuality" >
                <span>{weather.current.humidity }</span>
                <small>Humidity</small>
              </div>
              <div className={weather.current.uv > 7 ? 'Circle UVRed' : 'Circle UV'}>
                <span>{weather.current.uv}</span>
                <small>UV Index</small>
              </div>
            </div>
            {/* <div className='location-box'>
              <span className='location'>Your Location</span>
              <span className='city'>
                {weather.location.name},{weather.location.country}
              </span>
              <span className='date'>{dateBuilder(new Date())}</span>
            </div> */}
            {/* <div className='weather-box'>
              <div className='cold-icon'>
                <img
                  src={
                    weather.main.temp >= 30
                      ? './Images/sun.png'
                      : '/Images/cloudy.png'
                  }
                  alt='vv'
                />
              </div>
              <div className='temp'>
                <span className='deg'>
                  {Math.round(weather.main.temp)}&deg;C
                </span>
              </div>
              <div className='type'>
                <span> {weather.weather[0].description}</span>
              </div>
            </div> */}
            {/* <div className='Other-info1'>
              <div className='Small'>
                <span className='Icon'>
                  <BiCrosshair />
                </span>
                <span className='wind'>{weather.main.pressure}</span>
              </div>
              <div className='Small'>
                <span className='Icon'>
                  <FiDroplet />
                </span>
                <span className='Humdity'>{weather.main.humidity}</span>
              </div>
              <div className='Small'>
                <span className='Icon'>
                  <DiDigitalOcean />
                </span>
                <span className='temp'>{weather.main.sea_level}</span>
              </div>
            </div> */}
            {/* <div className='Other-info2'>
              <div className='Box1'>
                <div className='Inner-Box'>
                  <span> Feels like</span>
                  <span className='Right'>
                    {Math.round(weather.current.feelslike_c)}&deg;c
                  </span>
                </div>

                <div className='Inner-Box'>
                  <span>Wind Speed</span>
                  <span className='Right'>{weather.current.wind_kph} Km/h</span>
                </div>
                <div className='Inner-Box'>
                  <span>Wind Gust</span>
                  <span className='Right'>{weather.wind.gust} Km/h</span>
                </div>
              </div>
            </div> */}
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
