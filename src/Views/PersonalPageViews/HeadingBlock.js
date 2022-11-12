import React from 'react';
import style from './styles/wrapper.module.scss'

const HeadingBlock = ({ children, title = 'title' }) => {
  return (
    <div className={style["cabinet-form-block__top"]}>
      <div className={style["cabinet-form-block__heading"]}>{title}</div>
      {children}
    </div>
  );
};

export default React.memo(HeadingBlock);
