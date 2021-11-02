import React from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

import classes from './SpinnerIndicator.module.scss';

const SpinnerIndicator = () => (
  <section className={classes.spinner}>
    <BeatLoader color="#2196F3" size={25} />
  </section>
);

export default SpinnerIndicator;
