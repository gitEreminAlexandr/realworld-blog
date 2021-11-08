import {
  getArticle,
  getArticles,
  userRegister,
  userLogin,
  getUserThroughToken,
  postNewArticle,
  deleteArticle
} from '../../service/api';
import { setCookie, deleteCookie, getCookie, } from '../../utils/utils';

export const articlesGlobalAction = (article) => ({
  type: 'GLOBAL_ARTICLES',
  payload: article,
});

export const articleAction = (nameArticle) => ({
  type: 'ARTICLE',
  payload: nameArticle,
});

export const loandingIndicator = (value) => ({
  type: 'LOANDING',
  payload: value,
});

export const loandingArticle = (value) => ({
  type: 'LOANDING__ARTICLE',
  payload: value,
});

export const errorIndicator = (value) => ({
  type: 'ERROR_INDICATION',
  payload: value,
});

export const registerUser = (body) => ({
  type: 'SIGN_UP',
  payload: body,
});

export const userRegistoreError = () => ({
  type: 'REGISTORE_ERROR',
});

export const userLoginError = () => ({
  type: 'LOGIN_ERROR',
});

export const logOutAction = () => (dispatch) => {
  deleteCookie('token');
  dispatch({ type: 'LOG_OUT' });
};

export const getArticlesAction = (offset) => (dispatch) => {
  getArticles(offset)
    .then((body) => {
      dispatch(articlesGlobalAction(body));
    })
    .then(() => dispatch(loandingIndicator(false)))
    .then(() => dispatch(errorIndicator(false)));
};

export const getBodyArticleAction = (slug) => (dispatch) => {
  getArticle(slug)
    .then((body) => { 
      if(body.article === undefined) throw Error; 
      dispatch(articleAction(body.article))})
    .then(() => dispatch(loandingIndicator(false)))
    .catch(() => dispatch(errorIndicator(true)));
};

export const userCookieAction = () => (dispatch) => {
  const token = getCookie('token');

  if (token !== undefined) {
    dispatch(loandingIndicator(true));
    getUserThroughToken(token)
      .then(({ user }) => dispatch(registerUser(user)))
      .then(() => dispatch(loandingIndicator(false)));
  }
};

export const postUserRegistore = (body) => (dispatch) => {
  userRegister(body)
    .then(({ user }) => {
      const { token } = user;

      setCookie('token', token, { secure: true, 'max-age': 97200 });
      dispatch(registerUser(user));
    })
    .then(({ user }) => sessionStorage.setItem('user', user))
    .catch(() => dispatch(userRegistoreError()));
};

export const postUserLogin = (body) => (dispatch) => {
  dispatch(loandingIndicator(true));
  userLogin(body)
    .then(({ user }) => {
      const { token } = user;

      setCookie('token', token, { secure: true, 'max-age': 97200 });
      dispatch(registerUser(user));
    })
    .then(() => dispatch(loandingIndicator(false)))
    .catch(() => dispatch(userLoginError()));
};

export const newArticleAction = (bodyData) => (dispatch) => {
  const token = getCookie('token');

  postNewArticle(bodyData, token)
    .then((body) => dispatch(articleAction(body)))
    .then(() => dispatch(loandingIndicator(false)))
    .then(() => dispatch(loandingArticle(true)));
};

export const deleteArticleAction = (slug) => (dispatch) => {
  const token = getCookie('token');

  deleteArticle(slug, token)
    .then(() => dispatch({type: 'DELETE_ARTICLE'}))
    .then(() => dispatch(loandingIndicator(false)));
};


