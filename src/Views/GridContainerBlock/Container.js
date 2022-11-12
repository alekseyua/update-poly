import React from 'react';
import style from './styles/grid.module.scss';

const Container = ({ children, onScroll }) => {
  return  <div onScroll={onScroll} className={style['block__container']}>{children}</div>;
};

export default Container;
