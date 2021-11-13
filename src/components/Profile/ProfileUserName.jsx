import React from 'react';
import PropTypes from 'prop-types';

import classes from './Profile.module.scss';

const ProfileUserName = ({ register, errors }) => (
  <label className={classes.label}>
    <p className={classes.label__title}>Username</p>
    <input
      className={classes.label__input}
      type="text"
      placeholder="Username"
      minLength={3}
      maxLength={20}
      required
      {...register('username', {
        validate: (value) => Number.isNaN(Number(value)) || 'The field must be letters',
      })}
    />
    {errors.username && <p className={classes.errors}>{errors.username.message}</p>}
  </label>
);

ProfileUserName.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ProfileUserName;
