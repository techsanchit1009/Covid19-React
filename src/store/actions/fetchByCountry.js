import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchByCountrySuccess = (fetchedResponse) => {
  return{
    type: actionTypes.FETCH_BY_COUNTRY_SUCCESS,
    fetchedCountryData: fetchedResponse
  }
};

export const fetchByCountryStart = () => {
  return{
    type: actionTypes.FETCH_BY_COUNTRY_START
  };
};

export const initFetchByCountry = () => {
  return dispatch =>{
    dispatch(fetchByCountryStart());
    axios.get("https://corona.lmao.ninja/countries").then((response) => {
      dispatch(fetchByCountrySuccess(response.data))
    });
  };
};
