import React from 'react';
import style from './styles/wrapper.module.scss';

const WrapperButton = ({ children }) => {
  return <div className={style['button--flex-start']}>{children}</div>;
};
export default React.memo(WrapperButton);
