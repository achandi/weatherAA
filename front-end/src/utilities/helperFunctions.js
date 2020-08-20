export const modeAtIndex = (arr) => {
  const modeFound = [...arr]
    .sort(
      (x, y) =>
        arr.filter((val) => val === x).length -
        arr.filter((val) => val === y).length
    )
    .pop();
  return [modeFound, arr.findIndex((x) => x === modeFound)];
};

export const sum = (arr) => arr.reduce((x, y) => x + y, 0);
export const avg = (arr) => sum(arr) / arr.length;

export const convertToLocalTimeAndDay = (dateTime, tzOffset) => {
  const dateTzAdjustment = new Date((dateTime + tzOffset) * 1000);
  const time = dateTzAdjustment.toLocaleTimeString(
    {},
    { timeZone: "UTC", hour12: true, hour: "numeric", minute: "numeric" }
  );
  const day = dateTzAdjustment.toLocaleDateString(
    {},
    { timeZone: "UTC", weekday: "long" }
  );

  return [time, day];
};
