import React from "react";
import classes from "./Home.css";
import CurrentSitutations from "./CurrentSituations/CurrentSituations";
import CountryList from "./CountryList/CountryList";
import WorldMap from "./WorldMap/WorldMap";
import SpreadTrends from "./SpreadTrends/SpreadTrends";
import TwitterFeeds from '../../components/TwitterFeeds/TwitterFeeds';
import NewsUpdate from './NewsUpdate/NewsUpdate';
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
              <NewsUpdate />
            </div>
          </div>

          <div className={classes.RightMain}>
            <div className={classes.RatioNFeeds}>
              <Card> Some text</Card>
              <TwitterFeeds />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default home;
