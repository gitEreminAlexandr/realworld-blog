import { setCookie, deleteCookie, getCookie } from '../../utils/utils';
import { userRegister, userLogin, getUserThroughToken } from '../../service/api';
import { LOADING_SPINNER, ERROR_INDICATION } from './indicatorAction';

export const USER = (body) => ({
  type: 'USER',
  payload: body,
});

export const REGISTER_ERROR = () => ({
  type: 'REGISTER_ERROR',
});

export const LOGIN_ERROR = () => ({
  type: 'LOGIN_ERROR',
});

export const LOG_OUT = () => (dispatch) => {
  deleteCookie('token');
  dispatch({ type: 'LOG_OUT' });
};

export const GET_CURRENT_USER = () => (dispatch) => {
  const token = getCookie('token');

  if (token !== undefined) {
    dispatch(LOADING_SPINNER(true));
    getUserThroughToken(token)
      .then(({ status, data }) => {
        if (status === 200) dispatch(USER(data.user));
        if (status === 401) deleteCookie('token');
      })
      .then(() => dispatch(LOADING_SPINNER(false)));
  }
};

export const USER_REGISTER = (body) => (dispatch) => {
  dispatch(LOADING_SPINNER(true));
  userRegister(body)
    .then(({ status, data }) => {
      if (status === 200) {
        const { token } = data.user;
        setCookie('token', token, { secure: true, 'max-age': 97200 });
        dispatch(USER(data.user));
      }
      if (status === 422) {
        dispatch(REGISTER_ERROR());
      }
    })
    .then(() => dispatch(LOADING_SPINNER(false)))
    .catch(() => dispatch(ERROR_INDICATION()));
};

export const USER_LOGIN = (body) => (dispatch) => {
  dispatch(LOADING_SPINNER(true));
  userLogin(body)
    .then(({ status, data }) => {
      if (status === 200) {
        const { token } = data.user;
        setCookie('token', token, { secure: true, 'max-age': 97200 });
        dispatch(USER(data.user));
      }
      if (status !== 200) {
        dispatch(LOGIN_ERROR());
      }
    })
    .then(() => dispatch(LOADING_SPINNER(false)))
    .catch(() => dispatch(ERROR_INDICATION()));
};
