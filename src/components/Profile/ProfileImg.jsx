import React from 'react';
import PropTypes from 'prop-types';

import classes from './Profile.module.scss';

const ProfileImg = ({ register }) => (
  <label className={classes.label}>
    <p className={classes.label__title}>Avatar image (url)</p>
    <input
      className={classes.label__input}
      type="text"
      placeholder="Avatar image"
      minLength={8}
      maxLength={40}
      {...register('img')}
    />
  </label>
);

ProfileImg.propTypes = {
  register: PropTypes.func.isRequired,
};

export default ProfileImg;
