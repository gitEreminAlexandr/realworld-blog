import React, { useState, useRef, useEffect } from 'react';
import uniqid from 'uniqid';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { NEW_ARTICLE, LOADING_ARTICLE } from '../../store/action/articlesAction';

import classes from './NewArticle.module.scss';

const NewArticle = () => {

  const article = useSelector(({articlesReducer}) => articlesReducer.article);
  const loadingArticleValue = useSelector(({articlesReducer}) => articlesReducer.loading);

  const dispatch = useDispatch();

  const [saveTags, setSaveTags] = useState([]);
  const inputTag = useRef();

  const history = useHistory();

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (loadingArticleValue) {
      history.push(`/articles/${article.slug}`);
      dispatch(LOADING_ARTICLE(false));
    }
  }, [article.slug, dispatch, history, loadingArticleValue]);

  const deleteTag = (tagKey) => {
    setSaveTags((tag) => tag.filter((item) => item.keyTag !== tagKey));
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
    dispatch(NEW_ARTICLE(
      JSON.stringify({
        article: {
          ...form,
          tagList: saveTags.map((item) => item.titleTag),
        },
      })
    ));
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
                <button className={classes['form__tags--delete']} type="button" onClick={() => deleteTag(keyTag)}>
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

export default NewArticle;
