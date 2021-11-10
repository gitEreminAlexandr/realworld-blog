import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { GET_CURRENT_USER } from '../../store/action/userAction';

import Header from '../Header';
import Main from '../Main/Main';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GET_CURRENT_USER());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <Main />
    </BrowserRouter>
  );
};

export default App;
