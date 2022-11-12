import React from 'react';
import style from '../styles/wrapper.module.scss';

const WrapperButtonBottom = ({ btnCancel, btnSuccess }) => {
  return (
    <div className={style['cabinet-form__end']}>
      <div className={style['cabinet-form__end--left']}>{btnCancel}</div>
      <div className={style['cabinet-form__end--right']}>{btnSuccess}</div>
    </div>
  );
};

export default React.memo(WrapperButtonBottom);
