import data from './weather_data.json'

const WeatherCard = () => {
    const json = data

    const currentDay = new Date().getDay()

    
    let days = []
    for (let i = 0; i < 40; i++) {
        let day = new Date(json['list'][i]['dt_txt']).getDay()
        if (currentDay != day && days.includes(day) == false) {
            days.push(new Date(json['list'][i]['dt_txt']).getDay())
        }
    }

    let dayMap = new Map();

    for (let i = 0; i < 40; i++) {
        let day = new Date(json['list'][i]['dt_txt']).getDay()
        
    }


    console.log(days)
}

export default WeatherCard;