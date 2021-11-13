import apiRealworld from '../../service/api';
import { setCookie, deleteCookie, getCookie } from '../../utils/utils';
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

export const logOut = () => (dispatch) => {
  deleteCookie('token');
  dispatch({ type: 'LOG_OUT' });
};

export const getCurrentUser = () => (dispatch) => {
  const token = getCookie('token');

  if (token !== undefined) {
    dispatch(LOADING_SPINNER(true));
    apiRealworld
      .userByToken(token)
      .then(({ status, data }) => {
        if (status === 200) dispatch(USER(data.user));
        if (status === 401) deleteCookie('token');
      })
      .finally(() => dispatch(LOADING_SPINNER(false)));
  }
};

export const userRegister = (body) => (dispatch) => {
  dispatch(LOADING_SPINNER(true));
  apiRealworld
    .userRegistration(body)
    .then(({ status, data }) => {
      if (status === 201) {
        const { token } = data.user;
        setCookie('token', token, { secure: true, 'max-age': 97200 });
        dispatch(USER(data.user));
      }
      if (status === 422) {
        dispatch(REGISTER_ERROR());
      }
    })
    .catch(() => dispatch(ERROR_INDICATION()))
    .finally(() => dispatch(LOADING_SPINNER(false)));
};

export const userLogin = (body) => (dispatch) => {
  dispatch(LOADING_SPINNER(true));
  apiRealworld
    .userAuthorization(body)
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
    .catch(() => dispatch(ERROR_INDICATION()))
    .finally(() => dispatch(LOADING_SPINNER(false)));
};
