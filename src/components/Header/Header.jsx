import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { LOG_OUT } from '../../store/action/userAction';

import classes from './Header.module.scss';

const Header = () => {
  const dispatch = useDispatch();
  const login = useSelector(({ userReducer }) => userReducer.isLoggin);
  const user = useSelector(({ userReducer }) => userReducer.user);

  return (
    <header className={classes.header}>
      <h1 className={classes.header__title}>
        <Link to="/">Realworld Blog</Link>
      </h1>
      <ul className={classes.header__nav}>
        {login ? (
          <>
            <li className={classes['header__nav--create-article']}>
              <Link to="/new-article">Create article</Link>
            </li>
            <li className={classes['header__nav--profile']}>
              <Link to="/profile">
                <p>{user.username}</p>
                {user.image === null ? (
                  <img
                    className={classes['list-article__aftor--img']}
                    src="https://www.clipartmax.com/png/full/216-2165089_avatar-businessperson.png"
                    alt="avatar"
                    width={46}
                    height={46}
                  />
                ) : (
                  <img
                    className={classes['list-article__aftor--img']}
                    src={user.image}
                    alt="avatar"
                    width={46}
                    height={46}
                  />
                )}
              </Link>
            </li>
            <li className={classes['header__nav--log-out']}>
              <button type="button" onClick={() => dispatch(LOG_OUT())}>
                Log Out
              </button>
            </li>
          </>
        ) : (
          <>
            <li className={classes['header__nav--sign-in']}>
              <Link to="/sign-in">Sign in</Link>
            </li>
            <li className={classes['header__nav--sign-up']}>
              <Link to="/sign-up">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
