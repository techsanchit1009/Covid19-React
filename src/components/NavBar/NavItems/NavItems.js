import React from 'react';
import Logo from '../Logo/Logo';
import NavItem from './NavItem/NavItem';
import classes from './NavItems.css';

const navItems = () => {
  return (
    <React.Fragment>
      <Logo />
      <ul className={classes.NavItems}>
        <NavItem link="/" exact>Home</NavItem>
        <NavItem link="/faq">FAQ</NavItem>
        <NavItem link="/helpful-links">Helpful Links</NavItem>
      </ul>
    </React.Fragment>
  
  );
}
export default navItems;