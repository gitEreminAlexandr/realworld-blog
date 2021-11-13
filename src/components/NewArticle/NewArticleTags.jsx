import React from 'react';
import PropTypes from 'prop-types';

import classes from './NewArticle.module.scss';

const NewArticleTags = ({ inputTag, saveTags, onDeleteTag, onAddTag }) => (
  <>
    <p>Tags</p>
    {saveTags.length > 0 && (
      <div className={classes.tags}>
        {saveTags.map(({ titleTag, keyTag }) => (
          <div key={keyTag} className={classes.tags__item}>
            <button className={classes.tags__delete} type="button" onClick={() => onDeleteTag(keyTag)}>
              {titleTag}
            </button>
          </div>
        ))}
      </div>
    )}
    <label className={classes['new-tags']}>
      <input ref={inputTag} className={classes['new-tags__input']} type="text" placeholder="Tag" />
      <button className={classes['new-tags__add']} type="button" onClick={() => onAddTag()}>
        Add tag
      </button>
    </label>
  </>
);

NewArticleTags.propTypes = {
  inputTag: PropTypes.objectOf(PropTypes.any).isRequired,
  saveTags: PropTypes.arrayOf(PropTypes.any).isRequired,
  onDeleteTag: PropTypes.func.isRequired,
  onAddTag: PropTypes.func.isRequired,
};

export default NewArticleTags;
