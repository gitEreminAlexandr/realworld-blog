import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import uniqid from 'uniqid';

import classes from './EditArticle.module.scss';

const EditArticle = ({ article, user, history }) => {
  const { tagList, UserEmail, slug } = article;
  const [saveTags] = useState(tagList);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: article.title,
      description: article.description,
      body: article.body,
    },
  });

  const onSubmitNewArticle = (form) => {
    JSON.stringify({
      article: {
        ...form,
        tagList: saveTags,
      },
    });
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

EditArticle.propTypes = {
  article: PropTypes.instanceOf(Object).isRequired,
  user: PropTypes.string.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = ({ articlesReduse, userReduser }) => ({
  article: articlesReduse.article,
  user: userReduser.user.email,
});

export default connect(mapStateToProps, null)(EditArticle);
