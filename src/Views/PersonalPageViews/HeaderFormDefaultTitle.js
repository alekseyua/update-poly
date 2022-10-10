import React from 'react';
import style from './styles/wrapper.module.scss';

const HeaderFormDefaultTitle = ({ title }) => {
  return (
    <div className={style['cabinet-form-block__top']}>
      <div className={style['cabinet-form-block__heading']}>{title}</div>
    </div>
  );
};
export default React.memo(HeaderFormDefaultTitle);
