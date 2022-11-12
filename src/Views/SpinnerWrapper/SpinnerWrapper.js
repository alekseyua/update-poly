import React from 'react';
import style from './styles/index.module.scss';

const SpinnerWrapper = ({ children, addClass }) => {
  let styleWrapper = "spinner__wrapper"
  addClass?
    styleWrapper = `spinner__wrapper--${addClass}`
    : null
  return <div className={style[styleWrapper]}>{children}</div>;
};

export default React.memo(SpinnerWrapper);
