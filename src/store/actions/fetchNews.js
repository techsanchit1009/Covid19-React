import * as actionTypes from "./actionTypes";
import axios from "axios";

export const fetchNews = (news) => {
  return {
    type: actionTypes.FETCH_NEWS,
    newsArray: news,
  };
};

export const initFetchNews = () => {
  return (dispatch) => {
    const api_key = "c6a1adbb29f74f2eb5a2a5c54c6f51da";
    axios
      .get(
        `http://newsapi.org/v2/top-headlines?q=COVID&country=in&apiKey=${api_key}`
      )
      .then((response) => {
        let fetchedNewsArticles = response.data.articles.slice(0, 10);
        dispatch(fetchNews(fetchedNewsArticles));
      });
  };
};
