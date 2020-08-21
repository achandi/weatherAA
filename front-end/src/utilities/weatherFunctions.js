// note: added more comments than usual
import { breakDownPre } from "./constants";
import {
  convertToLocalTimeAndDay,
  modeAtIndex,
  sum,
  avg,
} from "./helperFunctions";
//see breakDown constant for breakdown of final dataect goal envisioned first

//Note: keep my reduce calls clean lately by referecing a named function i.e. .reduce(callback, {})
//With partial application, I can pass additional params for these reduce callbacks
//i.e. line 43 pass time, hourSet (3 hour) in first call (), reduce callback is second call ()
const hoursToDayReduce = (time, hourSet) => {
  //to do: (time permit) refactor reqData code so it's immutable obj
  const reqData = { time };
  //Note: advanced destructuring below with default case, for readability don't usually do this (will adapt to AgencyAnalytics policy :) )
  ({
    main: { temp: reqData.temp },
    weather: [{ description: reqData.description, icon: reqData.icon }],
    rain: { "3h": reqData.rain } = { "3h": 0 },
    snow: { "3h": reqData.snow } = { "3h": 0 },
    wind: { speed: reqData.wind } = { speed: 0 },
    clouds: { all: reqData.clouds } = { all: 0 },
  } = hourSet);
  //reduce callback below, passing in new values to day
  return (acc2, [key, val]) => ({ ...acc2, [key]: [...val, reqData[key]] });
};

//Why count? api's 5 day forecast has data in 3 hour intervals from now...
//Usually Day 1 has a past cutoff, but past hours !== forecast, unlike day 6 with it's future cutoff. so dont include day 6
//note: for immutability, usually call .filter((x, i) => i < 5) after reduce instead of count +=1 during (may refactor later)
const rawDataReduce = (tzOffset) => {
  let count = 0;
  // each hourset below = 3 hours of data
  return (acc, hourSet) => {
    ///Setting the date below to the timezone of the city, and getting day and time
    const [time, day] = convertToLocalTimeAndDay(hourSet.dt, tzOffset);
    //if day doesnt exist in object
    if (!acc[day]) count += 1;
    if (count > 5) {
      return acc;
    }
    const accDay = acc[day] || breakDownPre; //constant set up for init
    return {
      ...acc,
      [day]: Object.entries(accDay).reduce(hoursToDayReduce(time, hourSet), {}),
    };
  };
};

export const weatherHandler = (data) => {
  const tzOffset = data.city.timezone;
  const cityName = data.city.name;
  return [
    cityName.toLowerCase(),
    data.list.reduce(rawDataReduce(tzOffset), {}), //partial apply tzOffset
  ]; //lately ive been prefering writing my reduce functions like this and using partial application, fine with any company policy :)
};

//based on breakdown constant that's commented out (minor changes)
export const getDayValues = (day, measurement) => {
  const [mostFrequent, freqIndex] = modeAtIndex(day.description);
  const totalRain = Math.round(sum(day.rain));
  const totalSnow = Math.round(sum(day.snow));
  const rainStart =
    totalRain > 0 ? day.time[day.rain.findIndex((val) => val > 0)] : false;
  const snowStart =
    totalSnow > 0 ? day.time[day.snow.findIndex((val) => val > 0)] : false;
  const icon = `http://openweathermap.org/img/wn/${day.icon[freqIndex].replace(
    "n",
    "d"
  )}@2x.png`;
  return {
    forecastFrom:
      day.time[0].replace(/[.]/g, "").toLowerCase() === "2:00 am"
        ? false
        : day.time[0],
    displayWeather: mostFrequent.toUpperCase(),
    highTemp: Math.round(Math.max(...day.temp)) + measurement.temp,
    lowTemp: Math.round(Math.min(...day.temp)) + measurement.temp,
    avgWind: Math.round(avg(day.wind)) + measurement.wind,
    avgCloudiness: `${Math.round(avg(day.clouds))} %`,
    icon: icon,
    totalRain: totalRain ? totalRain + " mm" : false,
    totalSnow: totalSnow ? totalSnow + " mm" : false,
    rainStart,
    snowStart,
  };
};
