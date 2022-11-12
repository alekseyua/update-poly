import React from 'react';
import style from './styles/wishpage.module.scss';

const LayoutProduct = ({ children }) => {
  return <div className={style['wishpage__layout-product']}>{children}</div>;
};

export default React.memo(LayoutProduct);
