import { useRef, useState } from 'preact/hooks'
import './app.css'
import FetchWeather from './fetch/fetchWeather'
import WeatherCard from './fetch/weatherCards';

var now = new Date();
if (now.getHours() > 4 && now.getHours() <= 7) {
  document.body.className = " sunrise";
} 
else if (now.getHours() > 7 && now.getHours() < 15) {
  document.body.className = " day";
}
else {
  document.body.className = " night";
}

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
        <input value={city} ref={inputRef} id="city-select"></input>
        <button id='clickbtn' onClick={handleClick}>Click</button>
      </div>
      <FetchWeather city={city}/>
      <WeatherCard city={city}/>
    </div>
  )
}