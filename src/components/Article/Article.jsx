/* eslint-disable react/no-children-prop */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import { getArticle, deleteArticle } from '../../store/action/articlesAction';
import ArticleHeader from './ArticleHeader';
import SpinerIndicator from '../SpinnerIndicator';
import ErrorIndicator from '../ErrorIndicator';

import classes from './Article.module.scss';
import ArticleModal from './ArticleModal';

const Article = ({ slug }) => {
  const [modalDeleteArticle, setModalDeleteArticle] = useState(false);

  const dispatch = useDispatch();

  const article = useSelector(({ articlesReducer }) => articlesReducer.article);
  const loanding = useSelector(({ indicatorReducer }) => indicatorReducer.spinner);
  const errorIndicator = useSelector(({ indicatorReducer }) => indicatorReducer.error);
  const user = useSelector(({ userReducer }) => userReducer.user.email || 'null');

  const history = useHistory();

  useEffect(() => {
    dispatch(getArticle(slug));
  }, [dispatch, slug]);

  if (loanding) {
    return <SpinerIndicator />;
  }

  if (errorIndicator) {
    return <ErrorIndicator />;
  }

  const openModal = () => setModalDeleteArticle(true);
  const closeModal = () => setModalDeleteArticle(false);

  const articleDelete = (slugArticle) => {
    dispatch(deleteArticle(slugArticle));
    history.push(`/articles/`);
  };

  const { body, description, UserEmail } = article;

  return (
    <article className={classes.article}>
      <ArticleHeader article={article} />
      <div className={classes.description}>
        <p className={classes.description__text}>{description}</p>
        {UserEmail === user && (
          <div className={classes.action}>
            <button className={classes.action__delete} type="button" onClick={openModal}>
              Delete
            </button>
            {modalDeleteArticle && (
              <ArticleModal slug={slug} onCloseModal={closeModal} onArticleDelete={articleDelete} />
            )}
            <button
              className={classes.action__edit}
              type="button"
              onClick={() => history.push(`/articles/${slug}/edit`)}
            >
              Edit
            </button>
          </div>
        )}
      </div>
      <ReactMarkdown className={classes.article__content} children={body} remarkPlugins={[remarkGfm]} />
    </article>
  );
};

Article.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default Article;
