import React from "react";
import NavItems from "./NavItems/NavItems";
import classes from "./NavBar.css";


const NavBar = () => {
  return (
    <div className={classes.NavBar}>
      <div className={classes.Container}>
        <NavItems />
      </div>
    </div>
  );
};
export default NavBar;
