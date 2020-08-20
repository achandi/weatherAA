import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import styles from "./App.less";
import CityWeather from "./components/weatherPanel/weatherPanel";
import {
  baseWeatherUrl,
  suggestedCities,
  unitsOfMeasurment,
} from "./utilities/constants";
import { weatherHandler } from "./utilities/weatherFunctions";
import SearchPanel from "./components/SearchPanel/SearchPanel";

const initialState = {
  loading: false,
  error: "",
  data: {},
  loadedCity: "",
};
//with one reducer, feel it might not be as important to put in a seperate file (will easily adopt company policy :))
const weatherReducer = (state, action) => {
  switch (action.type) {
    case "DATA_GET":
      return { ...state, loading: true, error: "" };
    case "DATA_FAIL":
      return { ...state, loading: false, error: action.err };
    case "DATA_SUCCESS":
      const [city, cityData] = weatherHandler(action.data);
      return {
        ...state,
        loading: false,
        data: { ...state.data, [city]: cityData },
        loadedCity: city,
      };
    case "CLEAR_DATA":
      return {
        ...state,
        loadedCity: "",
        data: {},
      };
    case "DISMISS_ERROR":
      return {
        ...state,
        error: "",
      };
    default:
      return state;
  }
};

const App = () => {
  const [city, setCity] = useState(suggestedCities[0]); //set default to first city in my list
  const [units, setUnits] = useState(Object.keys(unitsOfMeasurment)[0]);
  const [weatherData, dispatchWeatherData] = useReducer(
    weatherReducer,
    initialState
  );

  useEffect(() => {
    setCity(suggestedCities[0]);
    dispatchWeatherData({
      type: "CLEAR_DATA",
    });
  }, [units]);

  useEffect(() => {
    (async () => {
      try {
        if (!weatherData.data || !weatherData.data[city]) {
          dispatchWeatherData({
            type: "DATA_GET",
          });
          const weatherData = await axios.get(
            `${baseWeatherUrl}?units=${units}&q=${city}&appid=${process.env.REACT_APP_WEATHER_KEY}`
          );
          dispatchWeatherData({
            type: "DATA_SUCCESS",
            data: weatherData.data,
            city,
          });
        }
      } catch (err) {
        if (err.response) {
          dispatchWeatherData({
            type: "DATA_FAIL",
            err: `${err.name} ${err.response.data.message}`,
          });
          setCity(weatherData.loadedCity);
        } else {
          dispatchWeatherData({
            type: "DATA_FAIL",
            err: `${err.name} ${err.message}`,
          });
          setCity(weatherData.loadedCity);
        }
      }
    })();
  }, [city, units]);

  const mapCity = (data) => {
    if (data) {
      return (
        <CityWeather
          measurement={unitsOfMeasurment[units]}
          city={city}
          data={data[city.toLowerCase()]}
        ></CityWeather>
      );
    }
  };
  const mapLoadedCities = () => {
    return Object.keys(weatherData.data).map((cities, index) => (
      <option key={index} value={cities}>
        {cities}
      </option>
    ));
  };
  return (
    <div className={styles.app}>
      <SearchPanel
        setCity={(parm) => setCity(parm)}
        units={units}
        setUnits={(parm) => setUnits(parm)}
      >
        <span className={styles.loadedCity}>
          City Loaded:
          <select
            onChange={(event) => setCity(event.target.value)}
            value={city}
          >
            {weatherData.data && mapLoadedCities()}
          </select>
        </span>
      </SearchPanel>
      <br />
      {/* normally would make both error/loading seperate component, time crunch */}
      {weatherData.error && (
        <div className={styles.error}>
          {weatherData.error}
          <button
            onClick={() => dispatchWeatherData({ type: "DISMISS_ERROR" })}
          >
            X
          </button>
        </div>
      )}
      {weatherData.loading && <div className={styles.loading}>Loading...</div>}
      <div>{mapCity(weatherData.data)}</div>
    </div>
  );
};

export default App;
