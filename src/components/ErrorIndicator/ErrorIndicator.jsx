import React from 'react';
import classes from './ErrorIndicator.module.scss';

const ErrorIndicator = () => (
  <section className={classes.error}>
    <p className={classes.error__text}>Oops😲 Something went wrong :(</p>
  </section>
);

export default ErrorIndicator;
