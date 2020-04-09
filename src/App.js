import React from "react";
import NavBar from "./components/NavBar/NavBar";
import classes from "./App.css";
import CurrentSitutations from './container/CurrentSituations/CurrentSituations';

const app = () => {
  return (
    <div className={classes.App}>
      <NavBar />
      <CurrentSitutations />
    </div>
  );
};

export default app;
