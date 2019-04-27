import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import $ from 'jquery'; 
import moment from 'moment';
import { WeatherIcon } from './weather.js';

const APPID = `5aaddd890594d7ec293c5201aadb9b5f`;


class Weather extends React.Component {
constructor(props){
    super(props);
    this.state = {
        cityName: 'any city!',
        currentWeather: null,
        fiveDayForecast: Array(5).fill(null),
        currentTemp: null,
        tempMin: null,
        tempMax: null,
        json : null,
        value: '',
        sunrise: null, 
        sunset: null,
        weatherIcon:   `./022-sun.png`,

    }
}

buildUrl = () => {
    const { cityName } = this.state;
    console.log(cityName);
    const api_address =`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${APPID}&units=imperial`;
    console.log(api_address);
    return api_address;

}
handleClick = () => {
    console.log('I started!');
    let city = this.state.value;
    this.setState({cityName : city}, () => {
        this.getWeather();
        console.log(`hello ${city}`);
    })
    
}

getWeather = async () => {
    let api_address = this.buildUrl()
    const api_call = await fetch(api_address);
    const response = await api_call.json();
    console.log(response);
    const weather = response.weather[0].main;
    const temp = Math.floor(response.main.temp);
    let sunrise = moment.unix(response.sys.sunrise).format('h:mm A');
    let sunset = moment.unix(response.sys.sunset).format('h:mm A');
    const tempMax = Math.floor(response.main.temp_max);
    const tempMin = Math.floor(response.main.temp_min);
    console.log(weather);
    this.setState({
        currentTemp : temp, 
        tempMax: tempMax,
        tempMin: tempMin,
        currentWeather: weather,
        sunrise : sunrise,
        sunset: sunset,
    });
}
handleChange = (event) => {
    this.setState({value: event.target.value});
}

render () {
    return (
        <div className="weatherApp">
            <div>
                <div>
                    <div className="searchBar">
                        <h1 className="inputHeader">Find out about the weather in </h1>
                        <div className="cityFont">{this.state.cityName}</div>
                        <div><WeatherIcon value={this.state.currentWeather}></WeatherIcon></div>
                        <div className="inputBox">
                            <input className="cityInput" value={this.state.value} onChange={this.handleChange}></input>
                            <button className="bttnStyle" onClick={this.handleClick}>CLICK ME!</button>
                        </div>
                    </div>
                    <div className="displayArea">
                        <div className="displayBox"><h4> Weather: {this.state.currentWeather}</h4></div>
                        <div className="displayBox"><h4>Current: {this.state.currentTemp}</h4></div>
                        <div className="displayBox"><h4>Low:  {this.state.tempMin}</h4></div>
                        <div className="displayBox"><h4>High: {this.state.tempMax}</h4></div>
                        <div className="displayBox"><h4>Sunrise: {this.state.sunrise}</h4></div>
                        <div className="displayBox"><h4>Sunset: {this.state.sunset}</h4></div>
                    </div>
                </div>
             </div>
        </div>
    )
}
}

ReactDOM.render(<Weather />, document.getElementById('root'));
