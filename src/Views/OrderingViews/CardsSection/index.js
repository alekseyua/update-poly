import React from 'react';
import style from '../styles/index.module.scss';

const CardsSection = ({ children }) => {
  return <section className={style['ordering__cards-container']}>{children}</section>;
};
export default React.memo(CardsSection);
