import React from "react";
import NavItems from "./NavItems/NavItems";
import { Link } from 'react-router-dom';
import Logo from './Logo/Logo';
import { FaBars } from 'react-icons/fa';
import classes from "./NavBar.css";


const NavBar = (props) => {
  return (
    <div className={classes.NavBar}>
      <div className={classes.NavContainer}>
        <div className={classes.Bars}>
          <FaBars onClick={props.show}/>
        </div>
        <div className={classes.LogoWrapper}>
        <Link to="/"><Logo /></Link>
        </div>
        <div className={classes.NavMenu}>
        <NavItems />
        </div>
      </div>
    </div>
  );
};
export default NavBar;
