import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { logOutAction } from '../../store/action/action';

import classes from './Header.module.scss';

const Header = ({ isLogin, user, onLogOut }) => (
  <header className={classes.header}>
    <h1 className={classes.header__title}>
      <Link to="/articles">Realworld Blog</Link>
    </h1>
    <ul className={classes.header__nav}>
      {isLogin ? (
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
            <button type="button" onClick={() => onLogOut()}>
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

Header.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  onLogOut: PropTypes.func.isRequired,
};

const mapStateToProps = ({ userReduser }) => ({
  isLogin: userReduser.isLoggin,
  user: userReduser.user,
});

const mapDispatchToProps = (dispatch) => ({
  onLogOut: () => dispatch(logOutAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
