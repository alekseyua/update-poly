import React from 'react';
import style from './styles/index.module.scss';

const WrapperWhoosaleCard = ({ children, brand = 'NAME BRAND №1' }) => {
  return (
    <div className={style['cabinet-orders-details__drop-wrapper']}>
      {/* Обертка для роли дроп/опт */}
      <div className={style['cabinet-orders-details__brand-name']}>{brand}</div>
      {children}
    </div>
  );
};

export default React.memo(WrapperWhoosaleCard);
