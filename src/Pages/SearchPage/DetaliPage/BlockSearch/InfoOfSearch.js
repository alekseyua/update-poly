import React from 'react';
import style from './styles/index.module.scss';

const InfoOfSearch = ({ count, product }) => {
  return (
    <React.Fragment>
      <p  className={style['catalog-search']}>
        {count} {product}
      </p>
      <hr className={style['catalog-search__line']}/>
    </React.Fragment>
  );
};

export default React.memo(InfoOfSearch);
