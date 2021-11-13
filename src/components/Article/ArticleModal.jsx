import React from 'react';
import PropTypes from 'prop-types';

import Question from '../../img/Question-mark.svg';

import classes from './Article.module.scss';

const ArticleModal = ({ slug, onCloseModal, onArticleDelete }) => (
  <div className={classes.modal}>
    <p className={classes.modal__text}>
      <img src={Question} alt="Question mark" />
      Are you sure to delete this article?
    </p>
    <div className={classes['modal-action']}>
      <button type="button" className={classes['modal-action__no-delete']} onClick={onCloseModal}>
        No
      </button>
      <button type="button" className={classes['modal-action__yes-delete']} onClick={() => onArticleDelete(slug)}>
        Yes
      </button>
    </div>
  </div>
);

ArticleModal.propTypes = {
  slug: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  onArticleDelete: PropTypes.func.isRequired,
};

export default ArticleModal;
