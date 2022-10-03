import React from 'react';
import BlockLine from '../../../Pages/CartPage/CartPageLayout/DatasPage/BlockLine';
import BlockText from '../../../Pages/CartPage/CartPageLayout/DatasPage/BlockText';

import style from '../styles/index.module.scss';

const DefaulWrapperInStock = ({ children, title = 'In stock' }) => {
  return (
    <div className={style['wrapper-woosale']}>
      <BlockText type={'text-brand'}>{title}</BlockText>
      <BlockLine />
      {children}
    </div>
  );
};

export default React.memo(DefaulWrapperInStock);
