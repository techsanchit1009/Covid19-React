import * as actionTypes from '../actions/actionTypes';

const initialState = {
  newsArray: [],
  loadingNews: false
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.FETCH_NEWS_START:
      return{
        ...state,
        loadingNews: true
      };

    case actionTypes.FETCH_NEWS_SUCCESS:
      return {
        ...state,
        newsArray: action.newsArray,
        loadingNews: false
      };
    default:
      return state;
  }
};

export default reducer;