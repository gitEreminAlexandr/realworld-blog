import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { getCurrentUser } from '../../store/action/userAction';

import Header from '../Header';
import Main from '../Main';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <Main />
    </BrowserRouter>
  );
};

export default App;
