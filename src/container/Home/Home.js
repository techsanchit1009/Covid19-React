import React, { useEffect } from "react";
import { connect } from "react-redux";
import CurrentSitutations from "./CurrentSituations/CurrentSituations";
import CountryList from "./CountryList/CountryList";
import WorldMap from "./WorldMap/WorldMap";
import SpreadTrends from "./SpreadTrends/SpreadTrends";
import TwitterFeeds from "../../components/TwitterFeeds/TwitterFeeds";
import NewsUpdate from "./NewsUpdate/NewsUpdate";
import RecoveryRatio from "./RecoveryRatio/RecoveryRatio";
import classes from "./Home.css";
import * as timelineAction from "../../store/actions/fetchByTimeline";
import * as countryAction from "../../store/actions/fetchByCountry";
import * as newsAction from "../../store/actions/fetchNews";
import Spinner from "../../components/Spinner/Spinner";

const Home = (props) => {
  useEffect(() => {
    props.onFetchTimeline();
    props.onFetchCountry();
    props.onFetchNews();
    const dataUpdater = setInterval(() => {
      props.onFetchTimeline();
      props.onFetchCountry();
      props.onFetchNews();
    }, 10 * 60000);

    return () => clearInterval(dataUpdater);
  }, [props.onFetchTimeline, props.onFetchCountry, props.onFetchNews]);

  let home = (
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
            <RecoveryRatio />
            <TwitterFeeds />
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <div className={classes.Home}>
      {props.loadingCases && props.loadingNews ? <Spinner /> : home}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loadingCases: state.casesData.loadingCases,
    loadingNews: state.newsData.loadingNews,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchTimeline: () => dispatch(timelineAction.initFetchByTimeline()),
    onFetchCountry: () => dispatch(countryAction.initFetchByCountry()),
    onFetchNews: () => dispatch(newsAction.initFetchNews()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
