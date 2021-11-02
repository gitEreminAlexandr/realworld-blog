import React, { useEffect } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Pagination from '../Pagination/Pagination';

import { getArticlesAction, loandingIndicator } from '../../store/action/action';

import classes from './ListArticle.module.scss';

const ListArticle = ({ globalArticle, onGetGlobalArticles, onLoanding, history }) => {
  const classesLike = classNames(
    classes['list-article__like--sign'],
    false ? classes['list-article__like--sign-active'] : null
  );

  useEffect(() => {
    onGetGlobalArticles(0);
  }, [onGetGlobalArticles]);

  return (
    <div className={classes['list-article']}>
      <ul className={classes['list-article__list']}>
        {globalArticle.map(({ author, title, tagList, updatedAt, description, slug }) => (
          <li key={title} className={classes['list-article__item']}>
            <article>
              <header className={classes['list-article__header']}>
                <div className={classes['list-article__container-title']}>
                  <div className={classes['list-article__container-title--name']}>
                    <h4 className={classes['list-article__title']}>
                      <button
                        type="button"
                        onClick={() => {
                          onLoanding(true);
                          history.push(`/articles/${slug}`);
                        }}
                      >
                        {title}
                      </button>{' '}
                    </h4>
                    <button type="button" className={classes['list-article__like']}>
                      <div className={classesLike} />
                      <p>12</p>
                    </button>
                  </div>
                  <div className={classes['list-article__tag']}>
                    {tagList.map((item) => (
                      <span key={item} className={classes['list-article__tag--item']}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className={classes['list-article__aftor']}>
                  <div className={classes['list-article__aftor--info']}>
                    <h5 className={classes['list-article__aftor--name']}>{author.username}</h5>
                    <p className={classes['list-article__aftor--date']}>
                      {format(new Date(updatedAt), 'MMMM dd, yyyy')}
                    </p>
                  </div>
                  <img
                    className={classes['list-article__aftor--img']}
                    src={
                      !author.img
                        ? 'https://www.clipartmax.com/png/full/216-2165089_avatar-businessperson.png'
                        : author.img
                    }
                    alt="avatar"
                    width={46}
                    height={46}
                  />
                </div>
              </header>
              <p className={classes['list-article__text']}>{description}</p>
            </article>
          </li>
        ))}
      </ul>
      <Pagination />
    </div>
  );
};

ListArticle.propTypes = {
  globalArticle: PropTypes.arrayOf(PropTypes.object).isRequired,
  onGetGlobalArticles: PropTypes.func.isRequired,
  onLoanding: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = ({ articlesReduse, indicatorReduse }) => ({
  globalArticle: articlesReduse.globalArticle,
  loanding: indicatorReduse.spinner,
});

const mapDispatchToProps = (dispatch) => ({
  onGetGlobalArticles: (offset) => dispatch(getArticlesAction(offset)),
  onLoanding: (value) => dispatch(loandingIndicator(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ListArticle));
