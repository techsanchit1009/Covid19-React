import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchByTimelineSuccess = (responseData) => {
  return {
    type: actionTypes.FETCH_BY_TIMELINE_SUCCESS,
    fetchedCasesData: responseData,
  };
};

export const fetchByTimelineFailed = () => {
  return {
    type: actionTypes.FETCH_BY_TIMELINE_FAILED
  };
};

export const fetchByTimelineStart = () => {
  return{
    type: actionTypes.FETCH_BY_TIMELINE_START
  };
};

export const initFetchByTimeline = () => {
  return dispatch => {
    dispatch(fetchByTimelineStart());
    axios
      .get('https://pomber.github.io/covid19/timeseries.json')
      .then(response => {
        dispatch(fetchByTimelineSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchByTimelineFailed());
      });

      setInterval(() => {
        axios
        .get('https://pomber.github.io/covid19/timeseries.json')
        .then(response => {
          dispatch(fetchByTimelineSuccess(response.data));
        })
        .catch(error => {
          dispatch(fetchByTimelineFailed());
        });
      }, 10 * 60000);
  };
};