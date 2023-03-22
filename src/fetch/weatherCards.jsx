import { useMemo, useState } from "preact/hooks";
import $ from 'jquery'


const WeatherCard = ({city}) => {    
    const [json, setJson] = useState(null)

    const url = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=metric&appid=02adac3e6a991d9f737fa48145b6c2ae';
    
    
    const currentDay = new Date().getDay()
    
    const getWeather = (url) => {
        $.when(apiCall(url)).done(function(response) {
            setJson(response)
        })
        
        return json
    }

    /**Gets the weather at the middle of the day, accounts for timezone differences */
    const middayWeatherIcon = (i, dayToMeasure, json) => {
        for(; i < 40; i++) {
            let dayEntry = json['list'][i]
            const date = new Date(dayEntry['dt_txt'])
            if (date.getDay() == dayToMeasure) {
                date.setSeconds(date.getSeconds() + json['city']['timezone'])
                if ((date.getHours() >= 12 && date.getHours() <= 15) || i == 39) {
                    return json['list'][i]['weather'][0]['icon']
                } 
            } else {
                break
            }
        }

        return '10d'
    }
    
    /**Memo is used to update the json response when the city changesso that it does't
     * do numerous, unnecessary api calls 
     */
    useMemo(() => getWeather(url), [city]) 
    
    if (json == null) {
        return <div>Please select city</div>
    }

    let dayMap = new Map();
    dayMap.set(0, 'Sun')
    dayMap.set(1, 'Mon')
    dayMap.set(2, 'Tue')
    dayMap.set(3, 'Wed')
    dayMap.set(4, 'Thur')
    dayMap.set(5, 'Fri')
    dayMap.set(6, 'Sat')


    let days = []
    /**This for loop is going through the json response from the api and making an 
     * array of the next five days, ranging from 0-6. The json show the next 40 entries
     * at 3 hour intervals each
     */ 
    for (let i = 0; i < 40; i++) {
        let day = new Date(json['list'][i]['dt_txt']).getDay()
        if (currentDay != day && !days.includes(day)) {
            days.push(new Date(json['list'][i]['dt_txt']).getDay())
        }
    }

    let temps = []
    let weatherIcons = []
    days = []
    /**This for loop goes through the json again and compares the day it is at
     * in the for loop to the current day and previous days in the days array.
     * When it finds a day that isn't in the array and isn't in the array already it
     * averages temp and pushes it in the temp array.
     * Also gathers the weather icon at midday to show a quick graphical preview
     * of the weather the next day
     */
    for (let i = 0; i < 40; i++) {
        let day = new Date(json['list'][i]['dt_txt']).getDay()
        if (day != currentDay && !days.includes(day)) {
            temps.push(avgTemp(i, day, json))
            days.push(day)
            const iconId = middayWeatherIcon(i, day, json)
            const icon = 'https://openweathermap.org/img/wn/' + iconId + '@2x.png'
            weatherIcons.push(icon)
        }
    }

    /**This for loop maps the days(0-6) to Sun-Sat respectively */
    for (let i = 0; i < days.length; i++) {
        days[i] = dayMap.get(days[i])
    }

    let weatherCards = []

    for (let i = 0; i < days.length; i++) {
        weatherCards.push(
        <div class="day-card" key={i}>
            <p id="card-day">{days[i]}</p>
            <div class="weather-card-icon-container">
                <img class="weather-card-icon" src={weatherIcons[i]}></img>
            </div>
            <p id='card-temp'>{temps[i]}<span>&#176;</span> </p>
        </div>
        )
    }

    return(
        <div class="day-forecast">
            {weatherCards}
        </div>
    )
}

const avgTemp = (i, dayToMeasure, json) => {
    let tempTotal = 0
    let numOfTempMeasurements = 0
    for (; i < 40; i++) {
        let dayEntry = json['list'][i]
        let date = new Date(dayEntry['dt_txt'])
        if (date.getDay() == dayToMeasure) {
            tempTotal = tempTotal + dayEntry['main']['temp']
            numOfTempMeasurements++  
        } else {
            break
        }
    }

    return Math.round(tempTotal / numOfTempMeasurements)
}

const apiCall = (url) => {
    return $.ajax({
        url: url,
        data: 'json',
        error: (err) => {console.log('error message: ' + err)}
    });
}

export default WeatherCard;