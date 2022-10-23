import React from 'react';
import style from './styles/index.module.scss';

const ChatFieldsWrapper = ({ children }) => {
  return <div className={style['cabinet-orders-details__chat-field']}>{children}</div>;
};

export default React.memo(ChatFieldsWrapper);
