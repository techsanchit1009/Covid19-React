import React from "react";
import covidLogo from "../../../assets/virus.svg";
import classes from './Logo.css';

const logo = () => {
  return (
    <div className={classes.Logo}>
      <img src={covidLogo} alt="Covid'19" />
      <span className={classes.LogoText}>COVID'19</span>
    </div>
  );
};

export default logo;
