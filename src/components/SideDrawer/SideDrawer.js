import React from "react";
import classes from "./SideDrawer.css";
import Backdrop from '../Backdrop/Backdrop';
import NavItems from '../NavBar/NavItems/NavItems';

const sideDrawer = props => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if(props.open){
    attachedClasses = [classes.SideDrawer, classes.Open]
  }
  return (
    <React.Fragment>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(' ')} onClick={props.closed}>
        <nav>
          <NavItems />
        </nav>
      </div>
    </React.Fragment>
  );
};

export default sideDrawer;
