import React from "react";
import Card from "../../../shared/Card/Card";
import classes from "./Country.css";

const country = (props) => {

  const formatCases = (cases) => {
    return (cases/1000).toFixed(1);
  }

  return (
    <Card>
      <div className={classes.Country}>
        <div className={classes.CountryHeading}>
          <div>
          <img
            src={props.flag}
            alt={props.countryName}
          />
          </div>
          <div>{props.countryName}</div>
        </div>
        <span className={[classes.CountryDetail, classes.Affected].join(' ')}>
          {props.affected < 100 ? (props.affected) : `${formatCases(props.affected)}k`} Affected
          </span>
        <span className={[classes.CountryDetail, classes.Recovered].join(' ')}>
        {props.recovered < 100 ? (props.recovered) : `${formatCases(props.recovered)}k`} Recovered</span>
      </div>
    </Card>
  );
};

export default country;
