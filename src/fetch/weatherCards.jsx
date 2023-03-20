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
    
    const cachedValue = useMemo(() => getWeather(url), [city]) 

    console.log("cachedValue: " + JSON.stringify(cachedValue))

    console.log("hello")

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
    for (let i = 0; i < 40; i++) {
        let day = new Date(json['list'][i]['dt_txt']).getDay()
        if (currentDay != day && !days.includes(day)) {
            days.push(new Date(json['list'][i]['dt_txt']).getDay())
        }
    }

    for (let i = 0; i < days.length; i++) {
        days[i] = dayMap.get(days[i])
    }

    let temps = []
    days = []
    for (let i = 0; i < 40; i++) {
        let day = new Date(json['list'][i]['dt_txt']).getDay()
        if (day != currentDay && !days.includes(day)) {
            temps.push(avgTemp(i, day, json))
            days.push(day)
        }
    }

    for (let i = 0; i < days.length; i++) {
        days[i] = dayMap.get(days[i])
    }

    let weatherCards = []

    for (let i = 0; i < days.length; i++) {
        weatherCards.push(
        <div class="day-card" key={i}>
            <p id="card-day">{days[i]}</p>
            <img src='src/sunimage.png'></img>
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
        if (new Date(dayEntry['dt_txt']).getDay() == dayToMeasure) {
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