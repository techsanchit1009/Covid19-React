import React from "react";
import NavBar from "./components/NavBar/NavBar";
import classes from "./App.css";
import CurrentSitutations from "./container/CurrentSituations/CurrentSituations";
import CountryList from "./container/CountryList/CountryList";
import WorldMap from "./container/WorldMap/WorldMap";
import SpreadTrends from "./container/SpreadTrends/SpreadTrends";
import Card from "./shared/Card/Card";

const app = () => {
  return (
    <div className={classes.App}>
      <NavBar />
      <div className={classes.Container}>
        <div className={classes.Main}>
          <div className={classes.LeftMain}>
            <CurrentSitutations />
            <div className={classes.ListnMap}>
              <CountryList />
              <WorldMap />
            </div>
            <div className={classes.GraphnNews}>
              <SpreadTrends />
              <div style={{ 'flex':'1' }}><Card>News</Card></div>
            </div>
          </div>

          <div className={classes.RightMain}>
            <div className={classes.RatioNFeeds}>
              <Card> Some text</Card>
              <Card> Some text</Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default app;
