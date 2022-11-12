import React from 'react';
import style from './styles/index.module.scss';

const SubTitle = ({ children, variant = '' }) => {
  return <p className={style[variant]}>{children}</p>;
};

export default React.memo(SubTitle);
