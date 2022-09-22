import React from 'react';
import style from './styles/index.module.scss';

const WrapperCards = ({ children }) => {
  return <div className={style['.cart-views__wrapper-card']}>{children}</div>;
};

export default React.memo(WrapperCards);
