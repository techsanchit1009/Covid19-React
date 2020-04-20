import React from "react";
import Card from "../../../../shared/Card/Card";
import classes from "./Country.css";
import { FaCaretUp } from 'react-icons/fa';
import { LazyLoadImage } from "react-lazy-load-image-component";

const Country = (props) => {
  const formatCases = (cases) => {
    return (cases / 1000).toFixed(1);
  };

  return (
    <Card>
      <div className={classes.Country}>
        <div>
        <div className={classes.CountryHeading}>
          <div>
            <LazyLoadImage src={props.flag} alt={props.countryName} />
          </div>
          <div>{props.countryName}</div>
        </div>
        <div>
          <span className={[classes.CountryDetail, classes.Affected].join(" ")}>
            {props.affected < 1000
              ? props.affected
              : `${formatCases(props.affected)}k`}{" "}
            Affected
          </span>
          <span className={[classes.CountryDetail, classes.Recovered].join(" ")}>
            {props.recovered < 1000
              ? props.recovered
              : `${formatCases(props.recovered)}k`}{" "}
            Recovered
          </span>
        </div>
        </div>
        <div className={classes.CaretSign}><FaCaretUp /></div>
      </div>
    </Card>
  );
};

export default Country;
