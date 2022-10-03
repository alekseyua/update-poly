import React from 'react';

import style from '../styles/index.module.scss';

const OrderingDeliverySection = ({ children }) => {
  return <section className={style['ordering__delivery']}>{children}</section>;
};

export default React.memo(OrderingDeliverySection);
