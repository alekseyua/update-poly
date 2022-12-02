import React from 'react';
import style from './styles/index.module.scss';

const Container = ({ children }) => {
  return <div className={style['catalog-search__container']}>{children}</div>;
};

export default React.memo(Container);
