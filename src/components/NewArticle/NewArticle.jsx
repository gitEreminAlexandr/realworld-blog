import React, { useState, useRef, useEffect } from 'react';
import uniqid from 'uniqid';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import { NEW_ARTICLE, LOADING_ARTICLE } from '../../store/action/articlesAction';

import classes from './NewArticle.module.scss';

const NewArticle = ({ newArticle, article, loadingArticleValue, loandingArticle }) => {
  const [saveTags, setSaveTags] = useState([]);
  const inputTag = useRef();

  const { register, handleSubmit } = useForm();
  const history = useHistory();

  useEffect(() => {
    if (loadingArticleValue) {
      history.push(`/articles/${article.slug}`);
      loandingArticle(false);
    }
  }, [article.slug, history, loadingArticleValue, loandingArticle]);

  const deleteTag = (tagTitle) => {
    setSaveTags((tag) => tag.filter((item) => item.titleTag !== tagTitle));
  };

  const deleteLastTag = () => {
    setSaveTags((tag) => tag.slice(0, -1));
  };

  const addTag = () => {
    const tag = inputTag.current.value;
    setSaveTags((tags) => [...tags, { titleTag: tag, keyTag: uniqid() }]);
    inputTag.current.value = null;
  };

  const onSubmitNewArticle = (form) => {
    newArticle(
      JSON.stringify({
        article: {
          ...form,
          tagList: saveTags.map((item) => item.titleTag),
        },
      })
    );
  };

  return (
    <div className={classes['new-article']}>
      <h2 className={classes['new-article--title']}>Create new article</h2>
      <form className={classes.form} onSubmit={handleSubmit((form) => onSubmitNewArticle(form))}>
        <label className={classes.form__title}>
          <p className={classes['form__title--name']}>Title</p>
          <input
            className={classes['form__title--input']}
            type="text"
            placeholder="Title"
            required
            {...register('title')}
          />
        </label>
        <label className={classes.form__discription}>
          <p className={classes['form__discription--name']}>Short description</p>
          <input
            className={classes['form__discription--input']}
            type="text"
            placeholder="Short description"
            required
            {...register('description')}
          />
        </label>
        <label className={classes.form__text}>
          <p className={classes['form__text--name']}>Text</p>
          <textarea className={classes['form__text--textarea']} placeholder="Text" required {...register('body')} />
        </label>
        <p className={classes['form__tags--name']}>Tags</p>
        {saveTags.length > 0 && (
          <div className={classes.form__saveTag}>
            {saveTags.map(({ titleTag, keyTag }) => (
              <div key={keyTag} className={classes['form__saveTag--item']}>
                <input
                  className={classes['form__tags--input']}
                  type="text"
                  placeholder="Tags"
                  defaultValue={titleTag}
                />
                <button className={classes['form__tags--delete']} type="button" onClick={() => deleteTag(titleTag)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
        <label className={classes.form__tags}>
          <input ref={inputTag} className={classes['form__tags--input']} type="text" placeholder="Tag" />
          <button className={classes['form__tags--delete']} type="button" onClick={() => deleteLastTag()}>
            Delete
          </button>
          <button className={classes['form__tags--add']} type="button" onClick={() => addTag()}>
            Add tag
          </button>
        </label>
        <button className={classes['form--submit']} type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

NewArticle.propTypes = {
  newArticle: PropTypes.func.isRequired,
  article: PropTypes.instanceOf(Object).isRequired,
  loadingArticleValue: PropTypes.bool.isRequired,
  loandingArticle: PropTypes.func.isRequired,
};

const mapStateToProps = ({ articlesReducer }) => ({
  article: articlesReducer.article,
  loadingArticleValue: articlesReducer.loading,
});

const mapDispatchToProps = (dispatch) => ({
  newArticle: (body) => dispatch(NEW_ARTICLE(body)),
  loandingArticle: (value) => dispatch(LOADING_ARTICLE(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewArticle);
