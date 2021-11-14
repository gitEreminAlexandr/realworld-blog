import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import { userRegister } from '../../store/action/userAction';

import classes from './SignUp.module.scss';
import SignUpUserName from './SignUprName';
import SignUpEmail from './SignUpEmail';
import SignUpPassword from './SignUpPassword';

const SignUp = () => {
  const dispatch = useDispatch();

  const logging = useSelector(({ userReducer }) => userReducer.isLogging);
  const errorRegister = useSelector(({ userReducer }) => userReducer.errorRegister);
  const [submitActive, setSubmitActive] = useState(true);
  const submitBtn = cn(submitActive ? classes.form__submit : classes['form__submit-no']);

  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const password = watch('password');

  useEffect(() => {
    if (logging) {
      history.push(`/articles`);
    }
  }, [history, logging]);

  const onSubmitForm = (data) => {
    const { repPassword, ...items } = data;
    dispatch(userRegister(JSON.stringify({ user: items })));
  };

  return (
    <div className={classes['sign-up']}>
      <h3 className={classes['sign-up__title']}>Create new account</h3>
      {errorRegister && <p className={classes.errors__login}>User aldready exists with this email id</p>}
      <form className={classes.form} onSubmit={handleSubmit((form) => onSubmitForm(form))}>
        <SignUpUserName register={register} errors={errors} />
        <SignUpEmail register={register} />
        <SignUpPassword register={register} errors={errors} password={password} />

        <hr className={classes.hr} />

        <label className={classes.agreement}>
          <input
            className={classes.agreement__input}
            type="checkbox"
            checked={submitActive}
            required
            onChange={() => setSubmitActive(!submitActive)}
          />
          <p className={classes.agreement__title}>I agree to the processing of my personal information</p>
          {errors.checkbox && <p className={classes.errors__input}>{errors.checkbox.message}</p>}
        </label>
        <button className={submitBtn} type="submit">
          Create
        </button>
      </form>

      <p className={classes.footer}>
        Already have an account?{' '}
        <Link className={classes.footer__link} to="/sign-in">
          Sign In.
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
