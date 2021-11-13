import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import uniqid from 'uniqid';

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
      <h2 className={classes['new-article__title']}>Edit article</h2>
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
        <p>Tags</p>
        {saveTags.length > 0 && (
          <div className={classes['tag-list']}>
            {saveTags.map((item) => (
              <div key={uniqid()} className={classes['tag-list__item']}>
                <input
                  className={classes['tag-list__input']}
                  type="text"
                  placeholder="Tags"
                  defaultValue={item}
                  disabled
                />
              </div>
            ))}
          </div>
        )}
        <button className={classes.form__submit} type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default EditArticle;
