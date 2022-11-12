import React from 'react';
import style from './styles/index.module.scss';

const WrapperChat = ({ children }) => {
  return <div className={style["cabinet-orders-details__chat-wrapper"]}>{children}</div>;
};

export default React.memo(WrapperChat);
