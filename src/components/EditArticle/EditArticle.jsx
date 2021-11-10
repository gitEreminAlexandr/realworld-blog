import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import uniqid from 'uniqid';
import { useHistory } from 'react-router-dom';

import classes from './EditArticle.module.scss';

const EditArticle = () => {
  const article = useSelector(({ articlesReducer }) => articlesReducer.article);
  const user = useSelector(({ userReducer }) => userReducer.user.email);

  const { tagList, UserEmail, slug } = article;
  const [saveTags] = useState(tagList);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: article.title,
      description: article.description,
      body: article.body,
    },
  });

  const history = useHistory();

  const onSubmitNewArticle = (form) => {
    // eslint-disable-next-line no-alert
    alert(
      JSON.stringify({
        article: {
          ...form,
          tagList: saveTags,
        },
      })
    );
    history.push(`/articles/${slug}`);
  };

  if (UserEmail !== user) {
    history.push(`/articles/${slug}`);
  }

  return (
    <div className={classes['new-article']}>
      <h2 className={classes['new-article--title']}>Edit article</h2>
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
            {saveTags.map((item) => (
              <div key={uniqid()} className={classes['form__saveTag--item']}>
                <input
                  className={classes['form__tags--input']}
                  type="text"
                  placeholder="Tags"
                  defaultValue={item}
                  disabled
                />
              </div>
            ))}
          </div>
        )}
        <button className={classes['form--submit']} type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default EditArticle;
