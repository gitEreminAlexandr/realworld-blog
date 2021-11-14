import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import HeaderLogging from './HeaderLogging';

import classes from './Header.module.scss';

const Header = () => {
  const logging = useSelector(({ userReducer }) => userReducer.isLogging);

  return (
    <header className={classes.header}>
      <h1 className={classes.header__title}>
        <Link to="/">Realworld Blog</Link>
      </h1>
      <ul className={classes.nav}>
        {logging ? (
          <HeaderLogging />
        ) : (
          <>
            <li className={classes['nav__sign-in']}>
              <Link to="/sign-in">Sign in</Link>
            </li>
            <li className={classes['nav__sign-up']}>
              <Link to="/sign-up">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
