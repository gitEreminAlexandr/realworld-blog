import React from 'react';
import PropTypes from 'prop-types';

import classes from './SignUp.module.scss';

const SignUpPassword = ({ register, errors, password = '' }) => (
  <>
    <label className={classes.label}>
      <p className={classes.label__title}>Password</p>
      <input
        className={classes.label__input}
        type="password"
        placeholder="Password"
        required
        {...register('password', {
          minLength: { value: 8, message: 'Your password needs to be at least 8 characters.' },
          maxLength: { value: 40, message: 'Your password must be no more than 40 characters long.' },
        })}
      />
      {errors.password && <p className={classes.errors__input}>{errors.password.message}</p>}
    </label>

    <label className={classes.label}>
      <p className={classes.label__title}>Repeat Password</p>
      <input
        className={classes.label__input}
        type="password"
        placeholder="Repeat Password"
        {...register('repPassword', {
          required: true,
          minLength: { value: 8, message: 'Your password needs to be at least 8 characters.' },
          maxLength: { value: 40, message: 'Your password must be no more than 40 characters long.' },
          validate: (value) => value === password || 'Passwords must match',
        })}
      />
      {errors.repPassword && <p className={classes.errors__input}>{errors.repPassword.message}</p>}
    </label>
  </>
);

SignUpPassword.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.objectOf(PropTypes.any).isRequired,
  password: PropTypes.string.isRequired,
};

export default SignUpPassword;
