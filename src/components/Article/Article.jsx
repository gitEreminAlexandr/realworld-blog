/* eslint-disable react/no-children-prop */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import { getBodyArticleAction, deleteArticleAction } from '../../store/action/action';
import SpinerIndicator from '../SpinnerIndicator';
import ErrorIndicator from '../ErrorIndicator';

import Question from '../../img/Question-mark.svg';
import classes from './Article.module.scss';

const Article = ({ article, slug, onGetArticle, loanding, errorIndicator, user, onDeleteArticleAction }) => {
  
  const [modalDeleteArticle, setModalDeleteArticle] = useState(false);
  const openModal = () => setModalDeleteArticle(true);
  const closeModal = () => setModalDeleteArticle(false);

  const history = useHistory();

  useEffect(() => {
    onGetArticle(slug);
  }, [onGetArticle, slug]);
  
  if (loanding) {
    return <SpinerIndicator />;
  }

  if (errorIndicator) {
    return <ErrorIndicator />;
  }

  const articleDelete = (slugArticle) => {
    onDeleteArticleAction(slugArticle);
    history.push(`/articles/`);
  }

  const { author, body, createdAt, description, tagList, title, UserEmail } = article;

  return (
    <article className={classes.article}>
      <header className={classes.article__header}>
        <div className={classes['article__container-title']}>
          <div className={classes['article__container-title--name']}>
            <h4 className={classes.article__title}>{title}</h4>
          </div>
          <div className={classes.article__tag}>
            {tagList.map((item) => (
              <span key={item} className={classes['article__tag--item']}>
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className={classes.article__aftor}>
          <div className={classes['article__aftor--info']}>
            <h5 className={classes['article__aftor--name']}>{author.username}</h5>
            <p className={classes['article__aftor--date']}>{format(new Date(createdAt), 'MMMM dd, yyyy')}</p>
          </div>
          <img
            className={classes['article__aftor--img']}
            src="https://www.clipartmax.com/png/full/216-2165089_avatar-businessperson.png"
            alt="avatar"
            width={46}
            height={46}
          />
        </div>
      </header>
      <div className={classes['article--description-action']}>
        <p className={classes.article__description}>{description}</p>
        {UserEmail === user && (
          <div className={classes.article__action}>
            <button className={classes['article__action--delete']} type="button" onClick={openModal}>
              Delete
            </button>
            {modalDeleteArticle && (
              <div className={classes.modal__wrapper}>
                <p className={classes['modal__wrapper--text']}>
                  <img src={Question} alt="Question mark" />
                  Are you sure to delete this article?
                </p>
                <div className={classes.modal__action}>
                  <button type="button" className={classes['modal__action--no-delete']} onClick={closeModal}>
                    No
                  </button>
                  <button type="button" className={classes['modal__action--yes-delete']} onClick={() => articleDelete(slug)}>
                    Yes
                  </button>
                </div>
              </div>
            )}
            <button
              className={classes['article__action--edit']}
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
  article: PropTypes.instanceOf(Object).isRequired,
  slug: PropTypes.string.isRequired,
  onGetArticle: PropTypes.func.isRequired,
  loanding: PropTypes.bool.isRequired,
  errorIndicator: PropTypes.bool.isRequired,
  user: PropTypes.string.isRequired,
  onDeleteArticleAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({ articlesReduse, indicatorReduse, userReduser }) => ({
  article: articlesReduse.article,
  loanding: indicatorReduse.spinner,
  errorIndicator: indicatorReduse.error,
  user: userReduser.user.email || 'null',
});

const mapDispatchToProps = (dispatch) => ({
  onGetArticle: (slug) => dispatch(getBodyArticleAction(slug)),
  onDeleteArticleAction: (slug) => dispatch(deleteArticleAction(slug))
});

export default connect(mapStateToProps, mapDispatchToProps)(Article);
