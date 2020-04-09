import React, { Component } from 'react';
import NavBar from './components/NavBar/NavBar';
import classes from './App.css';

class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <NavBar />
      </div>
    );
  }
}

export default App;
