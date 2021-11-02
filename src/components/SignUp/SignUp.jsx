import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { postUserRegistore } from '../../store/action/action';

import classes from './SignUp.module.scss';

const SignUp = ({ history, onRegister, errorRegistore, loggin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const password = watch('password');

  useEffect(() => {
    if (loggin) {
      history.push(`/articles`);
    }
  }, [history, loggin]);

  const onSubmitForm = (data) => {
    const { repPassword, ...items } = data;
    onRegister(JSON.stringify({ user: items }));
  };

  return (
    <div className={classes['sign-up']}>
      <h3 className={classes['sign-up__title']}>Create new account</h3>
      {errorRegistore && <p className={classes.errors__login}>such mail or name already exists</p>}
      <form className={classes['sign-up__form']} onSubmit={handleSubmit((form) => onSubmitForm(form))}>
        <label className={classes['sign-up__name']}>
          <p className={classes['sign-up__name--title']}>Username</p>
          <input
            className={classes['sign-up__name--input']}
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

        <label className={classes['sign-up__email']}>
          <p className={classes['sign-up__email--title']}>Email address</p>
          <input
            className={classes['sign-up__email--input']}
            type="email"
            placeholder="Email address"
            required
            {...register('email')}
          />
        </label>

        <label className={classes['sign-up__password']}>
          <p className={classes['sign-up__password--title']}>Password</p>
          <input
            className={classes['sign-up__password--input']}
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

        <label className={classes['sign-up__rep-password']}>
          <p className={classes['sign-up__rep-password--title']}>Repeat Password</p>
          <input
            className={classes['sign-up__rep-password--input']}
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

        <hr className={classes['sign-up__hr']} />

        <label className={classes['sign-up__agreement']}>
          <input className={classes['sign-up__agreement--input']} type="checkbox" defaultChecked required />
          <p className={classes['sign-up__agreement--title']}>I agree to the processing of my personal information</p>
          {errors.checkbox && <p className={classes.errors__input}>{errors.checkbox.message}</p>}
        </label>
        <button className={classes['sign-up__form--submit']} type="submit">
          Create
        </button>
      </form>

      <p className={classes['sign-up__footer']}>
        Already have an account?{' '}
        <a className={classes['sign-up__footer--link']} href="#">
          Sign In.
        </a>
      </p>
    </div>
  );
};

SignUp.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  onRegister: PropTypes.func.isRequired,
  errorRegistore: PropTypes.bool.isRequired,
  loggin: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ userReduser }) => ({
  loggin: userReduser.isLoggin,
  errorRegistore: userReduser.errorRegistore,
});

const mapDispatchToProps = (dispatch) => ({
  onRegister: (body) => dispatch(postUserRegistore(body)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUp));
