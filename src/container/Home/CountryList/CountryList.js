import React, { useEffect, useState } from "react";
import searchIcon from "../../../assets/search.svg";
import Card from "../../../shared/Card/Card";
import Country from "./Country/Country";
import classes from "./CountryList.css";
import { connect } from "react-redux";

const CountryList = (props) => {
  const [searchFilter, setSearchFilter] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);


  //  Searching work
  useEffect(() => {
    let updatedCountries = props.countryList.filter((countryIter) => {
      return countryIter.country.toLowerCase().includes(searchFilter.toLowerCase());
    });
    setFilteredCountries(updatedCountries);
  }, [searchFilter, props.countryList]);
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
          {filteredCountries.length >= 1 && !props.loadingCases ? (
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
            <p>{props.loadingCases ? "Loading..." : "Sorry, No result found!"}</p>
          )}
        </div>
      </Card>
    </div>
  );
};

const mapStateToProps = state => {
  // console.log(state);
  return {
    countryList: state.casesData.countryList,
    loadingCases: state.casesData.loadingCases
  };
};

export default connect(mapStateToProps)(CountryList);
