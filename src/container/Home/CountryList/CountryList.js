import React, { useEffect, useState } from "react";
import searchIcon from "../../../assets/search.svg";
import Card from "../../../shared/Card/Card";
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
    axios.get("https://corona.lmao.ninja/countries?sort=country").then((response) => {
      setLoading(false);
      let fetchedData = response.data.filter(
        (country) => country.cases > 10
      ).sort((a, b) => b.cases - a.cases);
      setCountries(fetchedData);
    });
  }, []);

  //  Searching work
  useEffect(() => {
    let updatedCountries = countries.filter((countryIter) => {
      return countryIter.country.toLowerCase().includes(searchFilter.toLowerCase());
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
            filteredCountries.map((countryIter) => (
              <Country
                key={countryIter.countryInfo.iso2}
                flag={generateFlag(countryIter.countryInfo.iso2)}
                countryName={countryIter.country}
                affected={countryIter.cases}
                recovered={countryIter.recovered}
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
