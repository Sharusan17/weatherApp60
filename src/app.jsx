import { useState } from 'preact/hooks'
import './app.css'
import FetchWeather from './fetch/fetchWeather'

export function App() {
  const [count, setCount] = useState(0)

  return (
    <>



      <div class="city_selection">
        <img src="" width="35em" class="logo" alt="City Selection" />
        
        <select id="city-select">
                <option value="London">London</option>
                <option value="New York">New York</option>
                <option value="Paris">Paris</option>
                <option value="Tokyo">Tokyo</option>
        </select>
      </div>


      <div class="weather_img">
        <img src="src/sunimage.png" width="100em" class="logo" alt="City Selection" />
      </div>


      <div class="card">    
        <FetchWeather />
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


    </>
  )
}
