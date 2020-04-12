import React from "react";
import classes from "./Home.css";
import CurrentSitutations from "../CurrentSituations/CurrentSituations";
import CountryList from "../CountryList/CountryList";
import WorldMap from "../WorldMap/WorldMap";
import SpreadTrends from "../SpreadTrends/SpreadTrends";
import Card from "../../shared/Card/Card";

const home = () => {
  return (
    <div className={classes.Home}>
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

export default home;
