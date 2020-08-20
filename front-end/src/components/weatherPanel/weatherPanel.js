import React from "react";
import Panel from "../UI/Panel/Panel";
import Day from "../Day/Day";
import { getDayValues } from "../../utilities/weatherFunctions";

const ciyWeather = (props) => {
  const renderDay = (data) => {
    return Object.entries(data).map(([day, dayValues], index) => {
      return (
        <Day
          key={props.city + day}
          weather={getDayValues(dayValues, props.measurement)}
          day={day}
        />
      );
    });
  };
  return <Panel>{props.data ? renderDay(props.data) : null}</Panel>;
};

export default ciyWeather;
