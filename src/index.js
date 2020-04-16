import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import App from './App';
import casesReducer from './store/reducers/casesReducer';
import newsReducer from './store/reducers/newsReducer';
import thunk from 'redux-thunk';
import './index.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;  

const rootReducer = combineReducers({
  newsData: newsReducer,
  casesData: casesReducer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(
  app,
  document.getElementById('root')
);
