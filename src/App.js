import React, { useState } from 'react'
import { FiDroplet } from 'react-icons/fi'
import { BiCrosshair } from 'react-icons/bi'
import { DiDigitalOcean } from 'react-icons/di'
// import moment from 'moment'
import './App.css'

const api = {
  key: '6208212bf5957b440941d859e95aa543',
  base: 'https://api.openweathermap.org/data/2.5/',
}
function App() {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})

  const search = (evt) => {
    if (evt.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result)
          setQuery('')
          console.log(result)
        })
    }
  }

  const dateBuilder = (d) => {
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    let days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]

    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div className={typeof weather.main != 'undefined' ? 'app' : 'app'}>
      <main>
        <div className='search-box'>
          <input
            type='text'
            className='search-bar'
            placeholder='Enter City Name'
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          ></input>
        </div>

        {typeof weather.main != 'undefined' ? (
          <div className='Box'>
            <div className='location-box'>
              <span className='location'>Your Location</span>
              <span className='city'>
                {weather.name},{weather.sys.country}
              </span>
              <span className='date'>{dateBuilder(new Date())}</span>
            </div>
            <div className='weather-box'>
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
            </div>
            <div className='Other-info1'>
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
            </div>
            <div className='Other-info2'>
              <div className='Box1'>
                <div className='Inner-Box'>
                  <span> Feels like</span>
                  <span className='Right'>
                    {Math.round(weather.main.feels_like)}&deg;c
                  </span>
                </div>

                <div className='Inner-Box'>
                  <span>Wind Speed</span>
                  <span className='Right'>{weather.wind.speed} Km/h</span>
                </div>
                <div className='Inner-Box'>
                  <span>Wind Gust</span>
                  <span className='Right'>{weather.wind.gust} Km/h</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </main>
    </div>
  )
}

export default App
