import React from 'react';
import style from './styles/formSignIn.module.scss';

const GroupBlock = ({ children }) => {
  return <div className={style['formSignIn__wrapper-form-group-btn']}>{children}</div>;
};

export default GroupBlock;