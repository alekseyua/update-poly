import React from 'react';
import style from './styles/wishpage.module.scss';

const CountProduct = ({ children }) => {
  return <div className={style['wishpage__count-product']}>{children}</div>;
};

export default React.memo(CountProduct);
