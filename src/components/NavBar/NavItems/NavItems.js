import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import NavItem from './NavItem/NavItem';
import classes from './NavItems.css';

const NavItems = () => {
  return (
    <React.Fragment>
      <Link to="/"><Logo /></Link>
      <ul className={classes.NavItems}>
        <NavItem link="/" exact>Home</NavItem>
        <NavItem link="/faq">FAQ</NavItem>
        <NavItem link="/helpful-links">Helpful Links</NavItem>
      </ul>
    </React.Fragment>
  
  );
}
export default NavItems;