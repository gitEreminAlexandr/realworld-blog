import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

import { userLogin } from '../../store/action/userAction';

import classes from './SignIn.module.scss';

const SignIn = () => {
  const dispatch = useDispatch();

  const logging = useSelector(({ userReducer }) => userReducer.isLogging);
  const errorLoggin = useSelector(({ userReducer }) => userReducer.errorLoggin);

  const { register, handleSubmit } = useForm();

  const history = useHistory();

  useEffect(() => {
    if (logging) {
      history.push(`/articles`);
    }
  }, [history, logging]);

  const onSubmitForm = (data) => {
    dispatch(userLogin(JSON.stringify({ user: data })));
  };

  return (
    <div className={classes['sign-in']}>
      <h3 className={classes['sign-in__title']}>Sign In</h3>
      {errorLoggin && <p className={classes.error__login}>mail or password is not correct</p>}
      <form className={classes.form} onSubmit={handleSubmit((form) => onSubmitForm(form))}>
        <label className={classes.label}>
          <p className={classes.label__title}>Email address</p>
          <input
            className={classes.label__input}
            type="email"
            placeholder="Email address"
            minLength={3}
            required
            {...register('email')}
          />
        </label>
        <label className={classes.label}>
          <p className={classes.label__title}>Password</p>
          <input
            className={classes.label__input}
            type="password"
            placeholder="Password"
            minLength={8}
            maxLength={40}
            required
            {...register('password')}
          />
        </label>
        <button className={classes.form__submit} type="submit">
          Login
        </button>
      </form>
      <p className={classes.footer}>
        Don’t have an account?{' '}
        <Link className={classes.footer__link} to="/sign-up">
          Sign Up.
        </Link>
      </p>
    </div>
  );
};

export default SignIn;
