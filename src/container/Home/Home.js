import React, { useEffect } from "react";
import { connect } from "react-redux";
import CurrentSitutations from "./CurrentSituations/CurrentSituations";
import CountryList from "./CountryList/CountryList";
import WorldMap from "./WorldMap/WorldMap";
import SpreadTrends from "./SpreadTrends/SpreadTrends";
import TwitterFeeds from "../../components/TwitterFeeds/TwitterFeeds";
import NewsUpdate from "./NewsUpdate/NewsUpdate";
import RecoveryRatio from "./RecoveryRatio/RecoveryRatio";
import Container from '../../shared/Container/Container';
import classes from "./Home.css";
import * as timelineAction from "../../store/actions/fetchByTimeline";
import * as countryAction from "../../store/actions/fetchByCountry";
import * as newsAction from "../../store/actions/fetchNews";
import * as totalCasesAction from '../../store/actions/fetchTotalCases';
import Spinner from "../../components/Spinner/Spinner";

const Home = (props) => {
  useEffect(() => {
    console.log('actions Dispatched');
    props.onFetchTotalCases();
    props.onFetchTimeline();
    props.onFetchCountry();
    props.onFetchNews();
  }, [props.onFetchTotalCases, props.onFetchTimeline, props.onFetchCountry, props.onFetchNews]);
 
  const updateTime = (time) => {
    let fullTimeArr = new Date(time).toString().split(" ");
    let date = `${fullTimeArr[2]} ${fullTimeArr[1]}, ${fullTimeArr[3]}  `;
    let timeArr = fullTimeArr[4].split(":");
    let meridian = "AM";
    if (timeArr[0] > 12) {
      timeArr[0] -= 12;
      meridian = "PM";
    }
    let timeString = `${timeArr[0]}:${timeArr[1]} ${meridian}`;
    return `${date} ${timeString}`;
  };

  let home = (
    <div className={classes.Home}>
      <div className={classes.Time}>Last Updated: {updateTime(new Date().getTime())}</div>
      <Container>
        <div className={classes.Main}>
          <div className={classes.LeftMain}>
            <CurrentSitutations
              totalCasesCount={props.totalCasesCount}
              splicedData={props.splicedData}
              loadingCases={props.loadingCases}
            />
            <div className={classes.ListnMap}>
              <CountryList
                countryList={props.countryList}
                loadingCountries={props.loadingCountries}
              />
              <WorldMap worldMapData={props.worldMapData} />
            </div>
            <div className={classes.GraphnNews}>
              <SpreadTrends casesByTimeline={props.casesByTimeline} />
              <NewsUpdate
                newsArray={props.newsArray}
                loadingNews={props.loadingNews}
              />
            </div>
          </div>

          {props.loadingNews ? <Spinner /> : (<div className={classes.RightMain}>
            <div className={classes.RatioNFeeds}>
              <RecoveryRatio totalCasesCount={props.totalCasesCount} />
              <TwitterFeeds />
            </div>
          </div>)}
        </div>
      </Container>
    </div>
  );
  return (
    <React.Fragment>
      {props.loadingCases && props.loadingNews ? <Spinner /> : home}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    totalCasesCount: state.casesData.totalCases,
    splicedData: state.casesData.splicedData,
    countryList: state.casesData.countryList,
    worldMapData: state.casesData.worldMapData,
    newsArray: state.newsData.newsArray,
    casesByTimeline: state.casesData.casesByTimeline,

    loadingCases: state.casesData.loadingCases,
    loadingNews: state.newsData.loadingNews,
    loadingCountries: state.casesData.loadingCountries,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchTimeline: () => dispatch(timelineAction.initFetchByTimeline()),
    onFetchCountry: () => dispatch(countryAction.initFetchByCountry()),
    onFetchNews: () => dispatch(newsAction.initFetchNews()),
    onFetchTotalCases: () => dispatch(totalCasesAction.initFetchTotalCases())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
