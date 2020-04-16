import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchByCountry = (fetchedResponse) => {
  return{
    type: actionTypes.FETCH_BY_COUNTRY,
    fetchedCountryData: fetchedResponse
  }
};

export const initFetchByCountry = () => {
  return dispatch =>{
    axios.get("https://corona.lmao.ninja/countries?sort=country").then((response) => {
      dispatch(fetchByCountry(response.data))
    });
  };
};
