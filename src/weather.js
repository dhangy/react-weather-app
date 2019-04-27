import React from 'react';
import ReactDOM from 'react-dom';
import sun from './assets/022-sun.png';
import rain from './assets/015-rain.png';
import storm from './assets/028-storm.png';
import clouds from './assets/023-sunny.png';
import snow from './assets/021-snowy.png';

export class WeatherIcon extends React.Component {


    getIcon() {
    console.log("I am working");
    const weather = this.props.value;
    if(weather === "Clear"){
        return sun;
    }
    if(weather === "Rain" || weather === "Drizzle") {
        return rain;
    }
    if(weather === "Clouds"){
        return clouds;
    }
    if(weather === "Snow"){
        return snow;
    }
    return storm;
    }
    
    render() {
        let icon = this.getIcon()
        console.log(icon);
        return (
           <div>
                <img className="weatherIcon" src={icon} />
            </div>
        )
    }
}
