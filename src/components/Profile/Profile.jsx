import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import ProfileUserName from './ProfileUserName';

import classes from './Profile.module.scss';
import ProfileEmail from './ProfileEmail';
import ProfilePassword from './ProfilePassword';
import ProfileImg from './ProfileImg';

const Profile = () => {
  const user = useSelector(({ userReducer }) => userReducer.user);
  const logging = useSelector(({ userReducer }) => userReducer.isLogging);

  const history = useHistory();

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

  if (!logging) history.push(`/articles`);

  const onSubmitForm = (data) => {
    // eslint-disable-next-line no-alert
    alert(JSON.stringify({ user: data }));
  };

  return (
    <div className={classes.profile}>
      <h3 className={classes.profile__title}>Edit Profile</h3>
      <form className={classes.form} onSubmit={handleSubmit((form) => onSubmitForm(form))}>
        <ProfileUserName register={register} errors={errors} />
        <ProfileEmail register={register} />
        <ProfilePassword register={register} />
        <ProfileImg register={register} />
        <button className={classes.form__submit} type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default Profile;
