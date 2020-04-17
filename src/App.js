import React, { Suspense } from "react";
import NavBar from "./components/NavBar/NavBar";
import Home from "./container/Home/Home";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import classes from "./App.css";

// const Home = React.lazy(() => {
//   return import("./container/Home/Home");
// });

const app = () => {
  let routes = (
    <Switch>
      <Route path="/" exact render={() => <Home />} />
    </Switch>
  );
  return (
    <BrowserRouter>
      <div className={classes.App}>
        <NavBar />
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </div>
    </BrowserRouter>
  );
};

export default app;
