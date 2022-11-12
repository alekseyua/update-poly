import React from 'react';
import style from '../styles/sectiondescription.module.scss';

const SectionDescriptionContainer = ({ children }) => {
  return <section className={style['productdescription__container']}>{children}</section>;
};

export default React.memo(SectionDescriptionContainer);
