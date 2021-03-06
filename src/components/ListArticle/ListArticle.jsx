import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { useHistory } from 'react-router-dom';

import { articlesGlobally } from '../../store/action/articlesAction';
import { LOADING_SPINNER } from '../../store/action/indicatorAction';

import Pagination from '../Pagination/Pagination';
import SpinnerIndicator from '../SpinnerIndicator';

import classes from './ListArticle.module.scss';

const ListArticle = () => {
  const dispatch = useDispatch();

  const globalArticle = useSelector(({ articlesReducer }) => articlesReducer.globalArticle);
  const loanding = useSelector(({ indicatorReducer }) => indicatorReducer.spinner);

  const history = useHistory();

  const openArticle = (slug) => {
    dispatch(LOADING_SPINNER(true));
    history.push(`/articles/${slug}`);
  };

  useEffect(() => {
    dispatch(articlesGlobally(0));
  }, [dispatch]);

  return (
    <div className={classes.article}>
      <ul>
        {loanding ? (
          <SpinnerIndicator />
        ) : (
          globalArticle.map(({ author, title, tagList, updatedAt, description, slug }) => (
            <li key={title} className={classes['article-item']}>
              <article>
                <header className={classes.header}>
                  <div className={classes['article-container']}>
                    <div>
                      <h4 className={classes['article-container-title']}>
                        <button type="button" onClick={() => openArticle(slug)}>
                          {title}
                        </button>
                      </h4>
                    </div>
                    <div className={classes['tag-list']}>
                      {tagList.map((item) => (
                        <span key={item} className={classes['tag-list__item']}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className={classes.author}>
                    <div className={classes['author-info']}>
                      <h5 className={classes['author-info__name']}>{author.username}</h5>
                      <p className={classes['author-info__date']}>{format(new Date(updatedAt), 'MMMM dd, yyyy')}</p>
                    </div>
                    <img
                      className={classes.author__img}
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
                <p className={classes.article__description}>{description}</p>
              </article>
            </li>
          ))
        )}
      </ul>
      <Pagination />
    </div>
  );
};

export default ListArticle;
