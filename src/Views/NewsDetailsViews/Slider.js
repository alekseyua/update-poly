import React from 'react';
import style from './styles/index.module.scss';

const Slider = ({ children }) => {
  return <div className={style['news-details__slider']}>{children}</div>;
};

export default React.memo(Slider);
