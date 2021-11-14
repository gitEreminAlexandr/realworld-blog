import React from 'react';
import PropTypes from 'prop-types';
import BeatLoader from 'react-spinners/BeatLoader';

import classes from './SpinnerIndicator.module.scss';

const SpinnerIndicator = ({ size }) => (
  <section className={classes.spinner}>
    <BeatLoader color="#2196F3" size={size} />
  </section>
);

SpinnerIndicator.defaultProps = {
  size: 25,
};

SpinnerIndicator.propTypes = {
  size: PropTypes.number,
};

export default SpinnerIndicator;
