import apiRealworld from '../../service/apiRealworld';
import { getCookie } from '../../utils/utils';
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

export const articlesGlobally = (offset) => (dispatch) => {
  apiRealworld
    .getGloballyArticles(offset)
    .then(({ status, data }) => {
      if (status === 200) {
        dispatch(GLOBAL_ARTICLES(data.articles));
      }
      if (status !== 200) {
        dispatch(ERROR_INDICATION(false));
      }
    })
    .finally(() => dispatch(LOADING_SPINNER(false)));
};

export const myArticles = (author) => (dispatch) => {
  apiRealworld
    .getMyArticles(author)
    .then(({ status, data }) => {
      if (status === 200) {
        dispatch(GLOBAL_ARTICLES(data.articles));
      }
      if (status !== 200) {
        dispatch(ERROR_INDICATION(false));
      }
    })
    .finally(() => dispatch(LOADING_SPINNER(false)));
};

export const getArticle = (slug) => (dispatch) => {
  apiRealworld
    .getArticle(slug)
    .then(({ status, data }) => {
      if (status === 200) {
        dispatch(ARTICLE(data.article));
        dispatch(ERROR_INDICATION(false));
      }
      if (status !== 200) dispatch(ERROR_INDICATION(true));
    })
    .catch(() => dispatch(ERROR_INDICATION(true)))
    .finally(() => dispatch(LOADING_SPINNER(false)));
};

export const newArticle = (bodyData) => (dispatch) => {
  const token = getCookie('token');

  apiRealworld
    .newArticle(bodyData, token)
    .then(({ status, data }) => {
      if (status === 201) {
        dispatch(ARTICLE(data.article));
      }
    })
    .then(() => dispatch(LOADING_ARTICLE(true)))
    .finally(() => dispatch(LOADING_SPINNER(false)));
};

export const deleteArticle = (slug) => (dispatch) => {
  const token = getCookie('token');

  apiRealworld
    .deleteArticle(slug, token)
    .then(() => dispatch({ type: 'DELETE_ARTICLE' }))
    .finally(() => dispatch(LOADING_SPINNER(false)));
};
