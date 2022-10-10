import React from 'react';
import style from './styles/index.module.scss';

const SubText = ({ children }) => {
  return (
    <p className={style['cabinet-subtext']}>
    {children}
    </p>
  );
};

export default React.memo(SubText);
