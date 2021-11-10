import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { GET_CURRENT_USER } from '../../store/action/userAction';

import Header from '../Header';
import Main from '../Main/Main';

const App = ({ userCookie }) => {
  useEffect(() => {
    userCookie();
  }, [userCookie]);

  return (
    <BrowserRouter>
      <Header />
      <Main />
    </BrowserRouter>
  );
};

App.propTypes = {
  userCookie: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  userCookie: () => dispatch(GET_CURRENT_USER()),
});

export default connect(null, mapDispatchToProps)(App);
