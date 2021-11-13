import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { logOut } from '../../store/action/userAction';

import classes from './Header.module.scss';

const HeaderLogging = () => {
  const dispatch = useDispatch();

  const user = useSelector(({ userReducer }) => userReducer.user);

  return (
    <>
      <li className={classes['nav__my-articles']}>
        <Link to="/my-articles">My articles</Link>
      </li>
      <li className={classes['nav__create-article']}>
        <Link to="/new-article">Create article</Link>
      </li>
      <li className={classes.nav__profile}>
        <Link to="/profile">
          <p>{user.username}</p>
          {user.image === null ? (
            <img
              className={classes['nav__profile-img']}
              src="https://www.clipartmax.com/png/full/216-2165089_avatar-businessperson.png"
              alt="avatar"
              width={46}
              height={46}
            />
          ) : (
            <img className={classes['nav__profile-img']} src={user.image} alt="avatar" width={46} height={46} />
          )}
        </Link>
      </li>
      <li className={classes['nav__log-out']}>
        <button type="button" onClick={() => dispatch(logOut())}>
          Log Out
        </button>
      </li>
    </>
  );
};

export default HeaderLogging;
