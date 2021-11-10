import classNames from 'classnames';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { ARTICLES_GLOBALLY } from '../../store/action/articlesAction';
import { LOADING_SPINNER } from '../../store/action/indicatorAction';

import classes from './Pagination.module.scss';

function Pagination() {

  const dispatch = useDispatch();

  const [pages] = useState([
    { count: 1, offset: 0 },
    { count: 2, offset: 5 },
    { count: 3, offset: 10 },
    { count: 4, offset: 15 },
    { count: 5, offset: 20 },
  ]);
  const [pagesActive, setPagesActive] = useState(1);

  const pageActiveClassName = (count) =>
    classNames(classes['pagination--count'], pagesActive === count ? classes['pagination--active'] : null);

  const itClassName = classNames(
    classes['pagination--lt'],
    pages[0].count === pagesActive ? classes['pagination--lt-active'] : null
  );

  const gtClassName = classNames(
    classes['pagination--gt'],
    pages.length === pagesActive ? classes['pagination--gt-active'] : null
  );

  const pageIt = () => {
    if (pagesActive !== pages[0].count) {
      dispatch(LOADING_SPINNER(true));
      dispatch(ARTICLES_GLOBALLY(pages[pagesActive - 2].offset));
      setPagesActive((page) => page - 1);
    }
  };

  const pageGt = () => {
    if (pages.length !== pagesActive) {
      dispatch(LOADING_SPINNER(true));
      dispatch(ARTICLES_GLOBALLY(pages[pagesActive].offset));
      setPagesActive((page) => page + 1);
    }
  };

  const page = (count, offset) => {
    if (pagesActive !== count) {
      dispatch(LOADING_SPINNER(true));
      setPagesActive(count);
      dispatch(ARTICLES_GLOBALLY(offset));
    }
  };

  return (
    <div className={classes.pagination}>
      <button type="button" className={itClassName} onClick={() => pageIt()}>
        &lt;
      </button>
      {pages.map(({ offset, count }) => (
        <button key={count} type="button" className={pageActiveClassName(count)} onClick={() => page(count, offset)}>
          {count}
        </button>
      ))}
      <button type="button" className={gtClassName} onClick={() => pageGt()}>
        &gt;
      </button>
    </div>
  );
}

export default Pagination;
