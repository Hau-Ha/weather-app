import React from "react";
import { useState } from "react";
import styles from "./CitySearch.module.css";

function CitySearch({ onCityFound, onError }) {
  const [city, setCity] = useState("");
  const apiKey = "sZjR9PF711QUGCCfdndxXAoG8I004cbr";

  const getLocationHandler = () => {
    const url = `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => res.find((l) => (l.Country.LocalizedName = { city })))
      .then((res) => {
        onCityFound({
          name: res.LocalizedName,
          key: res.Key,
          contryId: res.Country.ID,
        });
        setCity("");
      })
      .catch((error) => {
        onError({
          error: error,
        });
      });
  };

  return (
    <>
      <div>
        <input
          className={styles.search}
          type="text"
          placeholder="City name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className={styles.button}
          type="submit"
          onClick={() => getLocationHandler(city)}>
          Search
        </button>
      </div>
    </>
  );
}

export default CitySearch;
