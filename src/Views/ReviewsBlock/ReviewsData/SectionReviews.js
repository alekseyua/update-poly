import React from 'react';

import style from '../styles/reviews.module.scss';

const SectionReviews = ({ children }) => {
  return <section className={style["reviews__container"]}>{children}</section>;
};

export default React.memo(SectionReviews);
