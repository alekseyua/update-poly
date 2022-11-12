import React from 'react';
import style from '../styles/reviews.module.scss';

const ReviewsRow = ({ children }) => {
  return <div className={style['reviews__row']}>{children}</div>;
};

export default React.memo(ReviewsRow);
