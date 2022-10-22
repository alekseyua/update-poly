import React from 'react';
import style from './styles/index.module.scss';

const SubTitle = ({ children, variant = '' }) => {
  return <h3 className={style[variant]}>{children}</h3>;
};

export default React.memo(SubTitle);
