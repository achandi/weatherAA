//i want to make these cities suggested, but give the user the option to search any city (as more potential uses)
export const suggestedCities = ["Toronto", "Vancouver", "Montreal"];

export const baseWeatherUrl =
  "https://api.openweathermap.org/data/2.5/forecast";

//came up with data that might be usefeul by looking at api docs [data.city, data.list]
//https://openweathermap.org/forecast5
//city.name   city.timezone (shift in seconds from UTC)
//below are list.
export const breakDownPre = {
  time: [], //list.dt (in unix, UTC, need to convert to show city local time)
  rain: [], //list.rain.3h
  snow: [], //list.snow.3h
  wind: [], //list.wind.speed
  clouds: [], // list.clouds.all
  temp: [], //list.main.temp
  description: [], //list.weather.description
  icon: [], //list.weather.icon
};

// came up with final break down logic next, could use this to get the value with object methods, but just copying for now (time save)
// export const breakDown = {
//   time: [], //can be used for a: tell the user when day 1 forecast starts if it's cutoff, and b) when rain/snow will start
//   day: "", //IF i do 5 day as array of values vs doing this as key/value with day as key (still might be good for ease of refrence)
//   displayWeather: [], // push all 3 hour weather descriptions, then show the most frequent as a string
//   icon: [], //push all icons, then show the icon that mathces the display weather found above at corresponding index
//   high: [], //push all temperatures, find Math.max (round) show high for the day
//   low: [], //push all temperatures, find Math.min (round)  show low for the day
//   wind: [], //push all wind speeds, find the average (round)
//   clouds: [], // push all cloudiness %, find the average (thinking that combined with rain totals, can make a custom metric to tell if the day will be dreary)
//   totalRain: 0, // sum all 3 hour rain amounts in a day
//   totalSnow: 0, //sum all 3 hour snow amounts
//   rainStart: [], //push all 3 hour rain amounts, cross refrerence with time array
//   snowStart: [], //push all 3 hour snow amounts, cross refrerence with time array
// };

//manually typed out symbols for Celsius, meter/sec, etc after looking at docs
export const unitsOfMeasurment = {
  metric: { temp: "°C", wind: "m/sec" }, //manually mapped temp degree symbol
  imperial: { temp: "°F", wind: "mph" },
  kelvin: { temp: "K", wind: "m/sec" },
};
