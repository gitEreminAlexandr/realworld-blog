import React, { useState, useRef, useEffect } from 'react';
import uniqid from 'uniqid';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { newArticle, LOADING_ARTICLE } from '../../store/action/articlesAction';

import classes from './NewArticle.module.scss';
import NewArticleTags from './NewArticleTags';

const NewArticle = () => {
  const dispatch = useDispatch();

  const article = useSelector(({ articlesReducer }) => articlesReducer.article);
  const loadingArticleValue = useSelector(({ articlesReducer }) => articlesReducer.loading);
  const logging = useSelector(({ userReducer }) => userReducer.isLogging);

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

  const addTag = () => {
    const tag = inputTag.current.value;
    setSaveTags((tags) => [...tags, { titleTag: tag, keyTag: uniqid() }]);
    inputTag.current.value = null;
  };

  const onSubmitNewArticle = (form) => {
    dispatch(
      newArticle(
        JSON.stringify({
          article: {
            ...form,
            tagList: saveTags.map((item) => item.titleTag),
          },
        })
      )
    );
  };

  if (!logging) history.push(`/articles`);

  return (
    <div className={classes['new-article']}>
      <h2 className={classes['new-article__title']}>Create new article</h2>
      <form className={classes.form} onSubmit={handleSubmit((form) => onSubmitNewArticle(form))}>
        <label className={classes.title}>
          <p className={classes.title__name}>Title</p>
          <input className={classes.title__input} type="text" placeholder="Title" required {...register('title')} />
        </label>
        <label className={classes.discription}>
          <p className={classes.discription__name}>Short description</p>
          <input
            className={classes.discription__input}
            type="text"
            placeholder="Short description"
            required
            {...register('description')}
          />
        </label>
        <label className={classes.text}>
          <p className={classes.text__name}>Text</p>
          <textarea className={classes.text__textarea} placeholder="Text" required {...register('body')} />
        </label>
        <NewArticleTags
          inputTag={inputTag}
          saveTags={saveTags}
          onDeleteTag={deleteTag}
          onAddTag={addTag}
        />
        <button className={classes.form__submit} type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default NewArticle;
