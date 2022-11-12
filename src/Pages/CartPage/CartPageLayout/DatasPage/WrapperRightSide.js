import React from 'react';
import style from './styles/cartpage.module.scss';

const WrapperRightSide = ({ children }) => {
  return (
    <div className={style['cart-page__wrapper-right-side']}>
      {children}
    </div>
  );
};

export default React.memo(WrapperRightSide);
