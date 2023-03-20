import { useRef, useState } from 'preact/hooks'
import './app.css'
import FetchWeather from './fetch/fetchWeather'
import WeatherCard from './fetch/weatherCards';


export function App() {
  const [city, setCity] = useState("London")
  const inputRef = useRef(null)

  const handleClick = () => {
    setCity(inputRef.current.value)
  }

  return (
    <div class="body">
      <div class="city_selection">
        <img id="pinpoint_img" src="src/pinpoint.gif" width="40em" class="logo" alt="City Selection" />
        <input value={city} ref={inputRef} id="city-select">
                {/* <option value="London">London</option>
                <option value="New York">New York</option>
                <option value="Paris">Paris</option>
                <option value="Tokyo">Tokyo</option> */}
        </input>
        <button id='clickbtn' onClick={handleClick}>Click</button>
      </div>
      <FetchWeather city={city}/>
      <WeatherCard city={city}/>
    </div>
  )
}
