import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import classes from './Article.module.scss';

const ArticleHeader = ({ article }) => {
  const { author, createdAt, title } = article;

  return (
    <header className={classes.header}>
      <div className={classes['header-container']}>
        <div className={classes['header-container-title']}>
          <h4 className={classes['header-container-title__text']}>{title}</h4>
        </div>
        <div className={classes['tag-list']}>
          {article.tagList.map((item) => (
            <span key={item} className={classes['tag-list__item']}>
              {item}
            </span>
          ))}
        </div>
      </div>
      <div className={classes.author}>
        <div className={classes['author-info']}>
          <h5 className={classes['author-info__name']}>{author.username}</h5>
          <p className={classes['author-info__date']}>{format(new Date(createdAt), 'MMMM dd, yyyy')}</p>
        </div>
        <img
          className={classes['author-info__img']}
          src="https://www.clipartmax.com/png/full/216-2165089_avatar-businessperson.png"
          alt="avatar"
          width={46}
          height={46}
        />
      </div>
    </header>
  );
};

ArticleHeader.propTypes = {
  article: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ArticleHeader;
