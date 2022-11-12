import React from 'react';
import style from './styles/index.module.scss';

const SpinnerWrapperSpinnerCenterMargin = ({ children }) => {
  return <div className={style["spinner__wrapper-center-margen"]}>{children}</div>;
};

export default React.memo(SpinnerWrapperSpinnerCenterMargin);
