import React, { useEffect, useState } from "react";
import searchIcon from "../../assets/search.svg";
import Card from "../../shared/Card/Card";
import axios from "axios";
import Country from "./Country/Country";
import classes from "./CountryList.css";

const countryList = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios.get("https://api.covid19api.com/summary").then((response) => {
      setLoading(false);
      let fetchedData = response.data.Countries.filter(
        (country) => country.TotalConfirmed > 10
      ).sort((a, b) => b.TotalConfirmed - a.TotalConfirmed);
      setCountries(fetchedData);
    });
  }, []);

  //  Searching work
  useEffect(() => {
    let updatedCountries = countries.filter((country) => {
      return country.Country.toLowerCase().includes(searchFilter.toLowerCase());
    });
    setFilteredCountries(updatedCountries);
  }, [searchFilter, countries]);
  //---------------------

  const generateFlag = (countryCode) => {
    return `https://www.countryflags.io/${countryCode}/flat/32.png`;
  };

  return (
    <div className={classes.CountryList}>
      <Card>
        <div className={classes.SearchArea}>
          <img
            className={classes.SearchIcon}
            src={searchIcon}
            alt="search-icon"
          />
          <input
            className={classes.SearchInput}
            type="text"
            placeholder="Search Location"
            onChange={(event) => setSearchFilter(event.target.value.trim(""))}
          />
        </div>
        <div className={classes.List}>
          {filteredCountries.length >= 1 && !loading ? (
            filteredCountries.map((country) => (
              <Country
                key={country.CountryCode}
                flag={generateFlag(country.CountryCode)}
                countryName={country.Country}
                affected={country.TotalConfirmed}
                recovered={country.TotalRecovered}
              />
            ))
          ) : (
            <p>{loading ? "Loading..." : "Sorry, No result found!"}</p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default countryList;
