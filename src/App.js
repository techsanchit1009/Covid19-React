import React from "react";
import NavBar from "./components/NavBar/NavBar";
import Home from "./container/Home/Home";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import classes from "./App.css";

const app = () => {
  return (
      <BrowserRouter>
    <div className={classes.App}>
      <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
    </div>
      </BrowserRouter>
  );
};

export default app;
