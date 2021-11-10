import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import classes from './Profile.module.scss';

const Profile = () => {

  const user = useSelector(({userReducer}) => userReducer.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: user.username,
      email: user.email,
      token: user.token,
      password: null,
      img: null,
    },
  });

  const onSubmitForm = (data) => {
    // eslint-disable-next-line no-alert
    alert(JSON.stringify({ user: data }));
  };

  return (
    <div className={classes.profile}>
      <h3 className={classes.profile__title}>Edit Profile</h3>
      <form className={classes.profile__form} onSubmit={handleSubmit((form) => onSubmitForm(form))}>
        <label className={classes.profile__name}>
          <p className={classes['profile__name--title']}>Username</p>
          <input
            className={classes['profile__name--input']}
            type="text"
            placeholder="Username"
            minLength={3}
            maxLength={20}
            required
            {...register('username', {
              validate: (value) => Number.isNaN(Number(value)) || 'The field must be letters',
            })}
          />
          {errors.username && <p className={classes.errors__input}>{errors.username.message}</p>}
        </label>

        <label className={classes.profile__email}>
          <p className={classes['profile__email--title']}>Email address</p>
          <input
            className={classes['profile__email--input']}
            type="email"
            placeholder="Email address"
            required
            {...register('email')}
          />
        </label>

        <label className={classes.profile__password}>
          <p className={classes['profile__password--title']}>New password</p>
          <input
            className={classes['profile__password--input']}
            type="text"
            placeholder="New password"
            minLength={8}
            maxLength={40}
            {...register('password')}
          />
        </label>
        <label className={classes.profile__avatar}>
          <p className={classes['profile__avatar--title']}>Avatar image (url)</p>
          <input
            className={classes['profile__avatar--input']}
            type="text"
            placeholder="Avatar image"
            minLength={8}
            maxLength={40}
            {...register('img')}
          />
        </label>
        <button className={classes['profile__form--submit']} type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default Profile;
