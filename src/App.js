import React, { Suspense, useState } from "react";
import NavBar from "./components/NavBar/NavBar";
import Home from "./container/Home/Home";
import Faqs from './components/Faqs/Faqs';
import HelpfulLinks from './components/HelpfulLinks/HelpfulLinks';
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import classes from "./App.css";
import SideDrawer from './components/SideDrawer/SideDrawer';

// const Faqs = React.lazy(() => import("./components/Faqs/Faqs"));

const app = () => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const showSideDrawerHandler = () => {
    setShowSideDrawer(true);
  }

  const closeSideDrawerHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  }

  const routes = (
    <Switch>
      <Route path="/" exact render={() => <Home />} />
      <Route path="/faq" render={() => <Faqs />} />
      <Route path="/helpful-links" render={() => <HelpfulLinks />} />
      <Redirect to="/" />
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
