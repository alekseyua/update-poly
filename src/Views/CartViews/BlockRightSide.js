import React from 'react';
import style from './styles/index.module.scss';

const BlockRightSide = ({ children, mb = 0, mt = 0,fd }) => {
  return (
    <div style={{ marginBottom: mb, marginTop: mt,flexDirection:fd, }} className={style['cart-views__block--right-side']}>
      {children}
    </div>
  );
};

export default React.memo(BlockRightSide);
