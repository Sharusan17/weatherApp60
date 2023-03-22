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

    /**The parser method gets the json reponse and parses the relevent information
     * from it and sets the state of the corresponding variables to the values retrieved from
     * the json
     */
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

    /**catches if the api call is too slow and the code runs ahead without the api call returning */
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
                        {/*This html/jsx code presents the windspeed,percipitation and the help button */}
                        <div class="otherdata">
                            {/*For windspeed and precipation we combined html for the image and then preact for the API/Live data
                            These two combine well. Using both was the right decsion as its all included within the html we could 
                            apply CSS to all.*/}
                            <p id='windspeed'><img src="src/wind.png" width="25rem"> </img> {wind} mph</p
                            ><p id='precipation'> <img src="src/raindrop.png" width="25rem"> </img> {precip} mm</p>
                            {/*A help box was key for us as our target audience are less tech savoy we built this using html rather
                            then through preact as again we had more option on the design due to CSS and we could tailor it more for 
                            our target audience. */}
                            <div class="box">
                                <a href="#popup-box">
                                    <img src='src/questionMark.png' width="10rem"></img> 
                                    What are these?
                                </a>
                            </div>
                            {/*This below is the actual pop up box with the description of the symbols*/}
                            <div id="popup-box" class="modal">
                                <div class="content">
                                    <h6 id="popup Box"><img src="src/wind.png" width="25rem"> </img>This image shows you Windspeed measured in miles per hour</h6>
                                    <h6 id="popup Box"><img src="src/raindrop.png" width="25rem"> </img>This image shows you Percipitation measured in milimeters</h6>
                                    <a href="#" 
                                    class="box-close">{/*The 'x' to close the page */}
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
