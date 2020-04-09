import React from "react";
import NavBar from "./components/NavBar/NavBar";
import classes from "./App.css";
import CurrentSitutations from "./container/CurrentSituations/CurrentSituations";
import CountryList from "./container/CountryList/CountryList";

const app = () => {
  return (
    <div className={classes.App}>
      <div className={classes.Container}>
        <NavBar />
        <CurrentSitutations />
        <div className={classes.ListnMap}>
          <CountryList />
          <div style={{'border' : '1px solid black', 'height':'40vh', 'flex':'2'}}></div>
        </div>
      </div>
    </div>
  );
};

export default app;
