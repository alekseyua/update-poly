import React from 'react';
import style from './styles/cartpage.module.scss';

const BlockText = ({ type, children }) => {
  return <span className={style[`cart-page__${type}`]}>{children}</span>;
};

export default BlockText;
