import React from "react";
import styles from "./WeatherCard.module.css";

function WeatherDay({
  min,
  max,
  weatherType,
  weatherKey,
  dayOfWeek,
  day,
  month,
  year,
}) {
  return (
    <>
      <div className={styles.date}>
        {dayOfWeek} <br />
        {day - 1} /{month + 1}/ {year}
      </div>
      <div className={styles.mid}>
        {weatherType}
        <img
          className={styles.icon}
          alt={weatherType}
          src={`https://developer.accuweather.com/sites/default/files/${weatherKey}-s.png`}
        />
      </div>
      <div className={styles.temp}>
        Temp: Min: {min}/Max: {max}
      </div>
    </>
  );
}

export default WeatherDay;
