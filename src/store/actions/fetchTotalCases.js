import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchTotalCasesStart = () => {
  return{
    type: actionTypes.FETCH_TOTAL_CASES_START
  }
}

export const fetchTotalCasesSuccess = (responseData) => {
  return{
    type: actionTypes.FETCH_TOTAL_CASES_SUCCESS,
    fetchedTotalCases: responseData
  }
}

export const initFetchTotalCases = () => {
  return dispatch => {
    dispatch(fetchTotalCasesStart());
    axios.get('https://corona.lmao.ninja/v2/all')
      .then(response => {
        dispatch(fetchTotalCasesSuccess(response.data))
      });
    setInterval(() => {
      axios.get('https://corona.lmao.ninja/v2/all')
      .then(response => {
        dispatch(fetchTotalCasesSuccess(response.data))
      });
    }, 10 * 60000);
  }
}
