import React from 'react';
import style from './styles/cartpage.module.scss';

const BlockRightSide = ({ children, mb = 0, mt = 0,fd }) => {
  return (
    <div style={{ marginBottom: mb, marginTop: mt,flexDirection:fd, }} className={style['cart-page__block--right-side']}>
      {children}
    </div>
  );
};

export default React.memo(BlockRightSide);
