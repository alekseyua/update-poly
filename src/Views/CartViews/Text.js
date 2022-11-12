import React from 'react';
import style from './styles/index.module.scss';

const Text = ({ variant, children }) => {
  return <span className={style[variant]}>{children}</span>;
};

export default React.memo(Text);
