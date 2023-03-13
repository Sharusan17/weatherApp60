import $ from 'jquery';
import { useState } from 'preact/hooks'


const FetchWeather = ({city}) => {
    const [temp, setTemp] = useState(null)
    const url = 'http://api.openweathermap.org/data/2.5/weather?q='+ city +'&units=metric&APPID=02adac3e6a991d9f737fa48145b6c2ae';

    const parser = (json) => {
        const temp_c = json['main']['temp'];
        
        setTemp(Math.round(temp_c))
    }

    $.ajax({
        url: url,
        success: parser,
        error: (err) => {console.log('error message: ' + err)}
    })


    return (
        <div>
            {city}
            <p style={{color:"orange",fontSize: "45px", padding:"0", margin:"0"}}>
                {temp}
                <span>&#176;</span>
            </p>
        </div>
    )
}

export default FetchWeather;