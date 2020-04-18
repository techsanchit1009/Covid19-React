import React from 'react';
import classes from './Container.css';

const Container = (props) => (
  <div className={classes.Container}>{props.children}</div>
);

export default Container;