import $ from 'jquery';
import '/src/app.css'
import { useState } from 'preact/hooks'


const FetchWeather = ({city}) => {
    const [temp, setTemp] = useState(null)
    const [precip, setPrecip] = useState(null);
    const [wind, setWind] = useState(null);
    const [weatherIcon, setWeatherIcon] = useState(null)
    const [validInput, setValidInput] = useState(true)
    const [weatherConditions,setWeatherConditions] = useState(null)

    const url = 'http://api.openweathermap.org/data/2.5/weather?q='+ city +'&units=metric&APPID=02adac3e6a991d9f737fa48145b6c2ae';

    console.log("Hello " + city + " " + validInput)

    const parser = (json) => {
        const temp_c = json['main']['temp'];
        const precipitation = json['rain']?.['1h'] || 0;
        const windSpeed = json['wind']['speed'];
        const iconId = json['weather'][0]['icon'];
        setTemp(Math.round(temp_c));
        setPrecip(precipitation);
        setWind(Math.round(windSpeed));
        setWeatherIcon('https://openweathermap.org/img/wn/' + iconId + '@2x.png')
        setWeatherConditions(json['weather'][0]['main'])
    }
    
    $.ajax({
        url: url,
        success: (json) => {
            parser(json)
            setValidInput(true)
        },
        error: () => {
            setValidInput(false)
        }})

    if (validInput == false) {
        return <div class="city-error">Please enter a valid city</div>
    }
    
    return (
        <div class="center">
            <div class="weather_img">
            <img src={weatherIcon} width="100em" class="weather-logo" alt="City Selection" />
            </div>
            <div class="card"> 
                <div>
                    <div id='city_name' style={{textTransform: 'capitalize'}}>
                        {city}
                    </div>
                    <div class='weather_condition'>
                        {weatherConditions}
                    </div>
                    <p style={{color:"orange",fontSize: "45px", padding:"0", margin:"0"}}>
                        {temp}
                        <span>&#176;</span>
                        <div class="otherdata">
                            <p id='windspeed'><img src="src/wind.png" width="25rem"> </img> {wind} mph</p>
                            <p id='precipation'> <img src="src/raindrop.png" width="25rem"> </img> {precip} mm</p>
                            <div class="box">
                                <a href="#popup-box">
                                    <img src='src/questionMark.png' width="10rem"></img> 
                                    What are these?
                                </a>
                            </div>
                            <div id="popup-box" class="modal">
                                <div class="content">
                                    <h6 id="popup Box"><img src="src/wind.png" width="25rem"> </img>This image shows you Windspeed measured in miles per hour</h6>
                                    <h6 id="popup Box"><img src="src/raindrop.png" width="25rem"> </img>This image shows you Percipitation measured in milimeters</h6>
                                    <a href="#" 
                                    class="box-close">
                                        x
                                    </a>
                                </div>
                            </div>
                        </div>
                    </p>
                </div>
            </div>
        </div>
    )




}

export default FetchWeather;
