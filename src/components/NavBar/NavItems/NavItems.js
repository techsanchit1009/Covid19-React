import React from 'react'
import Logo from '../Logo/Logo';
import NavItem from './NavItem/NavItem';
import classes from './NavItems.css';

const navItems = () => {
  return (
    <React.Fragment>
      <Logo />
      <ul className={classes.NavItems}>
        <NavItem>Home</NavItem>
        <NavItem>FAQs</NavItem>
        <NavItem>Helpful Links</NavItem>
      </ul>
    </React.Fragment>
  
  );
}
export default navItems;