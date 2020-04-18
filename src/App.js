import React, { Suspense, useState } from "react";
import NavBar from "./components/NavBar/NavBar";
import Home from "./container/Home/Home";
import Faqs from './components/Faqs/Faqs';
import { Route, BrowserRouter, Switch } from "react-router-dom";
import classes from "./App.css";
import SideDrawer from './components/SideDrawer/SideDrawer';

// const Home = React.lazy(() => {
//   return import("./container/Home/Home");
// });

const app = () => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const showSideDrawerHandler = () => {
    setShowSideDrawer(true);
  }

  const closeSideDrawerHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  }

  let routes = (
    <Switch>
      <Route path="/" exact render={() => <Home />} />
      <Route path="/faq" render={() => <Faqs />} />

    </Switch>
  );
  return (
    <BrowserRouter>
      <div className={classes.App}>
        <NavBar show={showSideDrawerHandler}/>
        <SideDrawer open={showSideDrawer} closed={closeSideDrawerHandler} />
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </div>
    </BrowserRouter>
  );
};

export default app;
