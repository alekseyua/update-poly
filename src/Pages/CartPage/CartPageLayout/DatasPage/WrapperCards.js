import React from 'react';
import style from './styles/cartpage.module.scss';

const WrapperCards = ({ children }) => {
  return <div className={style['.cart-page__wrapper-card']}>{children}</div>;
};

export default React.memo(WrapperCards);
