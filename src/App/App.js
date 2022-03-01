import { useEffect, useState } from "react";
import CitySearch from "../CitySearch/CitySearch";
import WeatherCard from "../WeatherCard/WeatherCard";
import Header from "../Header/Header";
import styles from "./App.module.css";

export const App = () => {
  const [weatherInfo, setWeatherInfo] = useState();
  const [locationKey, setLocationKey] = useState("");
  const [location, setLocation] = useState("");
  const [isError, setError] = useState(false);
  const convertNum = (num) => {
    const stringNum = num + "";
    const stringLen = stringNum.length;

    if (stringLen === 1) {
      return "0" + stringNum;
    } else {
      return stringNum;
    }
  };

  const fToC = (fahrenheit) => {
    const fTemp = fahrenheit;
    const fToCel = ((fTemp - 32) * 5) / 9;

    return Math.floor(fToCel) + "\xB0C.";
  };

  const apiKey = "sZjR9PF711QUGCCfdndxXAoG8I004cbr";
  useEffect(() => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    if (locationKey) {
      fetch(
        `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}`
      )
        .then((res) => res.json())
        .then((res) => {
          setWeatherInfo(
            res.DailyForecasts.map((df) => {
              return {
                min: fToC(df.Temperature.Minimum.Value),
                max: fToC(df.Temperature.Maximum.Value),
                weatherType: df.Day.IconPhrase,
                weatherKey: convertNum(df.Day.Icon),
                dayOfWeek: daysOfWeek[new Date(df.Date).getDay()],
                day: new Date(df.Date).getDay(),
                month: new Date(df.Date).getMonth(),
                year: new Date(df.Date).getFullYear(),
              };
            })
          );
        });
    }
  }, [locationKey]);

  return (
    <div className={styles.main_container}>
      <Header />
      <CitySearch
        onCityFound={(cityInfo) => {
          setLocationKey(cityInfo.key);
          setLocation(cityInfo.name + ", " + cityInfo.contryId);
          setError(false);
          console.log(isError);
        }}
        onError={(e) => {
          console.error(e.error);
          setError(true);
          console.log(isError);
        }}
      />
      {isError === true ? (
        <h3 className={styles.error_text}>
          Enter the city name or The city is not found{" "}
        </h3>
      ) : (
        <></>
      )}
      {!isError && (
        <div>
          <h2 className={styles.city_name}>{location}</h2>
          {!!weatherInfo &&
            weatherInfo.map((i, index) => (
              <div className={styles.day} key={index}>
                <WeatherCard
                  min={i.min}
                  max={i.max}
                  weatherType={i.weatherType}
                  weatherKey={i.weatherKey}
                  dayOfWeek={i.dayOfWeek}
                  day={i.day}
                  month={i.month}
                  year={i.year}
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
