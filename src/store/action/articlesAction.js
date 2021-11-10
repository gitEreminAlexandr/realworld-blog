import { getCookie } from '../../utils/utils';
import { getArticle, getArticles, postNewArticle, deleteArticle } from '../../service/api';
import { LOADING_SPINNER, ERROR_INDICATION } from './indicatorAction';

export const GLOBAL_ARTICLES = (article) => ({
  type: 'GLOBAL_ARTICLES',
  payload: article,
});

export const ARTICLE = (nameArticle) => ({
  type: 'ARTICLE',
  payload: nameArticle,
});

export const LOADING_ARTICLE = (value) => ({
  type: 'LOADING_ARTICLE',
  payload: value,
});

export const ARTICLES_GLOBALLY = (offset) => (dispatch) => {
  getArticles(offset)
    .then(({ status, data }) => {
      if (status === 200) {
        dispatch(GLOBAL_ARTICLES(data.articles));
      }
      if (status !== 200) {
        dispatch(ERROR_INDICATION(false));
      }
    })
    .then(() => dispatch(LOADING_SPINNER(false)));
};

export const GET_AN_ARTICLE = (slug) => (dispatch) => {
  getArticle(slug)
    .then(({ status, data }) => {
      if (status === 200) {
        dispatch(ARTICLE(data.article));
        dispatch(ERROR_INDICATION(false));
      }
      if (status !== 200) dispatch(ERROR_INDICATION(true));
    })
    .then(() => dispatch(LOADING_SPINNER(false)))
    .catch(() => dispatch(ERROR_INDICATION(true)));
};

export const NEW_ARTICLE = (bodyData) => (dispatch) => {
  const token = getCookie('token');

  postNewArticle(bodyData, token)
    .then(({ status, data }) => {
      if (status === 201) {
        dispatch(ARTICLE(data.article));
      }
    })
    .then(() => dispatch(LOADING_SPINNER(false)))
    .then(() => dispatch(LOADING_ARTICLE(true)));
};

export const DELETE_ARTICLE = (slug) => (dispatch) => {
  const token = getCookie('token');

  deleteArticle(slug, token)
    .then(() => dispatch({ type: 'DELETE_ARTICLE' }))
    .then(() => dispatch(LOADING_SPINNER(false)));
};
