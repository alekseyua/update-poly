import React from 'react';
import style from './styles/index.module.scss';

const LeftSideCol = ({ children }) => {
  return <div className={style['cabinet-orders-details__list-right']}>{children}</div>;
};

export default React.memo(LeftSideCol);
