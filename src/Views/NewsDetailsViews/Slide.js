import React from 'react';
import style from './styles/index.module.scss';

const Slide = ({ children, image, openModal }) => {
  if (image) {
    return (
      <div onClick={openModal} className={style['news-details__slide']}>
        <img src={image} alt={'image review'} className={style['news-details__slide-item']} />
      </div>
    );
  }
  return (
    <div onClick={openModal} className={style['news-details__slide']}>
      {children}
    </div>
  );
};
export default React.memo(Slide);
