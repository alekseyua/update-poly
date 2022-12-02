import React from 'react';
import style from './styles/index.module.scss';

const SearchWrapper = ({ children }) => {
  return <div className={style['catalog-search__wrap']}>{children}</div>;
};

export default React.memo(SearchWrapper);
