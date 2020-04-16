import * as actionTypes from '../actions/actionTypes';

const initialState = {
  newsArray: []
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.FETCH_NEWS:
      return {
        ...state,
        newsArray: action.newsArray
      };
    default:
      return state;
  }
};

export default reducer;