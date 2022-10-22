import React from 'react';
import style from './styles/index.module.scss';

const ContainerTitle = ({ children, variant = '' }) => {
  return <div className={style[variant]}>{children}</div>;
};

export default React.memo(ContainerTitle);
