import React from 'react';
import PropTypes from 'prop-types';

import classes from './SignUp.module.scss';

const SignUpUserName = ({ register, errors }) => (
  <label className={classes.label}>
    <p className={classes.label__title}>Username</p>
    <input
      className={classes.label__input}
      type="text"
      placeholder="Username"
      minLength={3}
      required
      {...register('username', {
        validate: (value) => Number.isNaN(Number(value)) || 'The field must be letters',
      })}
    />
    {errors.username && <p className={classes.errors__input}>{errors.username.message}</p>}
  </label>
);

SignUpUserName.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default SignUpUserName;
