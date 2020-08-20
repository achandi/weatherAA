import React from "react";
import Card from "../UI/Card/Card";
const Day = (props) => {
  return (
    <Card>
      <div>
        <h1>
          {props.day}
          {props.weather.forecastFrom && "*"}
        </h1>
        <img src={props.weather.icon} />
        <h3>{props.weather.displayWeather}</h3>
        <h3>
          High {props.weather.highTemp} Low {props.weather.lowTemp}
        </h3>
        <div className="percipitation">
          {" "}
          {props.weather.totalRain &&
            `Rain: ${props.weather.totalRain} begins ${props.weather.rainStart}`}
          {props.weather.totalSnow &&
            `Snow: ${props.weather.totalSnow}  begins  ${props.weather.snowStart}`}
        </div>
        <div className="averages">
          <li>Average wind: {props.weather.avgWind} </li>
          <li>Average cloudiness: {props.weather.avgCloudiness}</li>
        </div>
        <p>
          {props.weather.forecastFrom &&
            "*Forecast from " + props.weather.forecastFrom}
        </p>
      </div>
    </Card>
  );
};

export default Day;
