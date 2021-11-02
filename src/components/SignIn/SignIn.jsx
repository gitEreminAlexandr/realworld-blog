import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { postUserLogin } from '../../store/action/action';

import classes from './SignIn.module.scss';

const SignIn = ({ onLogin, history, loggin, errorLoggin }) => {
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (loggin) {
      history.push(`/articles`);
    }
  }, [history, loggin]);

  const onSubmitForm = (data) => {
    onLogin(JSON.stringify({ user: data }));
  };

  return (
    <div className={classes['sign-in']}>
      <h3 className={classes['sign-in__title']}>Sign In</h3>
      {errorLoggin && <p className={classes.error__login}>mail or password is not correct</p>}
      <form className={classes['sign-in__form']} onSubmit={handleSubmit((form) => onSubmitForm(form))}>
        <label className={classes['sign-in__name']}>
          <p className={classes['sign-in__name--title']}>Email address</p>
          <input
            className={classes['sign-in__name--input']}
            type="email"
            placeholder="Email address"
            minLength={3}
            maxLength={20}
            required
            {...register('email')}
          />
        </label>
        <label className={classes['sign-in__password']}>
          <p className={classes['sign-in__password--title']}>Password</p>
          <input
            className={classes['sign-in__password--input']}
            type="password"
            placeholder="Password"
            minLength={8}
            maxLength={40}
            required
            {...register('password')}
          />
        </label>
        <button className={classes['sign-in__form--submit']} type="submit">
          Login
        </button>
      </form>
      <p className={classes['sign-in__footer']}>
        Don’t have an account?{' '}
        <Link className={classes['sign-in__footer--link']} to="/sign-up">
          Sign Up.
        </Link>
      </p>
    </div>
  );
};

SignIn.propTypes = {
  onLogin: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  loggin: PropTypes.bool.isRequired,
  errorLoggin: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ userReduser }) => ({
  loggin: userReduser.isLoggin,
  errorLoggin: userReduser.errorLoggin,
});

const mapDispatchToProps = (dispatch) => ({
  onLogin: (body) => dispatch(postUserLogin(body)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignIn));
