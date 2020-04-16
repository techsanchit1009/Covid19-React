import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchByTimeline = (responseData) => {
  return {
    type: actionTypes.FETCH_BY_TIMELINE,
    fetchedCasesData: responseData,
  };
};

export const fetchByTimelineFailed = () => {
  return {
    type: actionTypes.FETCH_BY_TIMELINE_FAILED
  }
}

export const initFetchByTimeline = () => {
  return dispatch => {
    axios
      .get('https://pomber.github.io/covid19/timeseries.json')
      .then(response => {
        dispatch(fetchByTimeline(response.data));
      })
      .catch(error => {
        dispatch(fetchByTimelineFailed());
      });
  };
};