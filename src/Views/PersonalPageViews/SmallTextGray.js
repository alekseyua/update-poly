import React from 'react';
import style from './styles/wrapper.module.scss'

const SmallTextGray = ({ children }) => {
  return <div className={style["cabinet-text-small"]}>{children}</div>;
};
export default React.memo(SmallTextGray);
