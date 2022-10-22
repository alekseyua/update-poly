import React from 'react';
import style from './styles/index.module.scss';

const SectionWrapper = ({ children }) => {
  return <div className={style['cabinet-orders-details__list-wrapper']}>{children}</div>;
};

export default React.memo(SectionWrapper);
