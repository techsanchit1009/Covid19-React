import * as actionTypes from "./actionTypes";
import axios from "axios";

export const fetchNewsSuccess = (news) => {
  return {
    type: actionTypes.FETCH_NEWS_SUCCESS,
    newsArray: news,
  };
};

export const fetchNewsStart = () => {
  return{
    type: actionTypes.FETCH_NEWS_START
  };
};

export const initFetchNews = () => {
  return (dispatch) => {
    dispatch(fetchNewsStart());
    const api_key = "c6a1adbb29f74f2eb5a2a5c54c6f51da";
    axios
      .get(
        `http://newsapi.org/v2/top-headlines?q=COVID&country=in&apiKey=${api_key}`
      )
      .then((response) => {
        let fetchedNewsArticles = response.data.articles.slice(0, 10);
        dispatch(fetchNewsSuccess(fetchedNewsArticles));
      });
  };
};
