import React from 'react';
import PropTypes from 'prop-types';

import classes from './Profile.module.scss';

const ProfilePassword = ({ register }) => (
  <label className={classes.label}>
    <p className={classes.label__title}>New password</p>
    <input
      className={classes.label__input}
      type="text"
      placeholder="New password"
      minLength={8}
      maxLength={40}
      {...register('password')}
    />
  </label>
);

ProfilePassword.propTypes = {
  register: PropTypes.func.isRequired,
};

export default ProfilePassword;
