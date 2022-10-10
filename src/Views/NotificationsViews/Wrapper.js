import React from 'react';
import style from './styles/index.module.scss';

const Wrapper = ({ children }) => {
  return <div className={style['cabinet-mobile__wrapper']}>{children}</div>;
};

export default React.memo(Wrapper);
