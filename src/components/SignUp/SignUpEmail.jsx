import React from 'react';
import PropTypes from 'prop-types';

import classes from './SignUp.module.scss';

const SignUpEmail = ({ register }) => (
  <label className={classes.label}>
    <p className={classes.label__title}>Email address</p>
    <input className={classes.label__input} type="email" placeholder="Email address" required {...register('email')} />
  </label>
);

SignUpEmail.propTypes = {
  register: PropTypes.func.isRequired,
};

export default SignUpEmail;
