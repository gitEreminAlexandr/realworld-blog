import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { userCookieAction } from '../../store/action/action';

import Header from '../Header';
import Main from '../Main/Main';

const App = ({ onUser }) => {
  useEffect(() => {
    onUser();
  }, [onUser]);

  return (
    <BrowserRouter>
      <Header />
      <Main />
    </BrowserRouter>
  );
};

App.propTypes = {
  onUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onUser: () => dispatch(userCookieAction()),
});

export default connect(null, mapDispatchToProps)(App);
