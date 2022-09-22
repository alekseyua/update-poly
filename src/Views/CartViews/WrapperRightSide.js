import React from 'react';
import style from './styles/index.module.scss';

const WrapperRightSide = ({ children }) => {
  return (
    <div className={style['cart-views__wrapper-right-side']}>
      {children}
    </div>
  );
};

export default React.memo(WrapperRightSide);
