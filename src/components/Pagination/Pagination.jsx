import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';

import { articlesGlobally } from '../../store/action/articlesAction';
import { LOADING_SPINNER } from '../../store/action/indicatorAction';

import classes from './Pagination.module.scss';

const Pagination = () => {
  const dispatch = useDispatch();

  const [pages] = useState([
    { count: 1, offset: 0 },
    { count: 2, offset: 5 },
    { count: 3, offset: 10 },
    { count: 4, offset: 15 },
    { count: 5, offset: 20 },
  ]);
  const [pagesActive, setPagesActive] = useState(1);

  const pageActiveClassName = (count) => cn(classes.count, pagesActive === count && classes.active);

  const ltClassName = cn(
    classes.pagination__lt,
    pages[0].count === pagesActive && classes['pagination__lt-active']
  );

  const gtClassName = cn(
    classes.pagination__gt,
    pages.length === pagesActive && classes['pagination__gt-active']
  );

  const pageLt = () => {
    if (pagesActive !== pages[0].count) {
      dispatch(LOADING_SPINNER(true));
      dispatch(articlesGlobally(pages[pagesActive - 2].offset));
      setPagesActive((page) => page - 1);
    }
  };

  const pageGt = () => {
    if (pages.length !== pagesActive) {
      dispatch(LOADING_SPINNER(true));
      dispatch(articlesGlobally(pages[pagesActive].offset));
      setPagesActive((page) => page + 1);
    }
  };

  const page = (count, offset) => {
    if (pagesActive !== count) {
      dispatch(LOADING_SPINNER(true));
      setPagesActive(count);
      dispatch(articlesGlobally(offset));
    }
  };

  return (
    <div className={classes.pagination}>
      <button type="button" className={ltClassName} onClick={() => pageLt()}>
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
};

export default Pagination;
