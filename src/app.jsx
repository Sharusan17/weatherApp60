import { useState } from 'preact/hooks'
import './app.css'
import FetchWeather from './fetch/fetchWeather'

export function App() {
  const [city, setCity] = useState("London")

  return (
    <>


    <div class="body">
      <div class="city_selection">
        <img id="pinpoint_img" src="src/pinpoint.gif" width="40em" class="logo" alt="City Selection" />
        <select value={city} onInput={(e) => setCity(e.target.value)} id="city-select">
                <option value="London">London</option>
                <option value="New York">New York</option>
                <option value="Paris">Paris</option>
                <option value="Tokyo">Tokyo</option>
        </select>
      </div>

      <div class="center">
        <div class="weather_img">
          <img src="src/sunimage.png" width="100em" class="logo" alt="City Selection" />
        </div>
        <div class="card">    
          <FetchWeather city={city}/>
        </div>
      </div>


      
      
      <div class="day-forecast">
        <a href="#Monday">Monday</a>
        <a href="#Tuesday">Tuesday</a>
        <a href="#Wednesday">Wednesday</a>
        <a href="#Thursday">Thursday</a>
        <a href="#Friday">Friday</a>
        <a href="#Saturday">Saturday</a>
        <a href="#Sunday">Sunday</a>
      </div>

    </div>
    </>
  )
}
