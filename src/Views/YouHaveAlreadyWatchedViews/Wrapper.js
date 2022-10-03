import React from 'react';

import style from './styles/youhavealredywatchedviews.module.scss';

const Wrapper = ({ children, title }) => {
  return (
    <section className={style['viewedproducts']}>
      <div className={style['viewedproducts__container']}>
        <h2 className={style['viewedproducts__title']}>{title}</h2>
      </div>
      <div className={style['viewedproducts__slider-wrapper']}>
        <div className={style['viewedproducts__slider-wrapper-inner']}>{children}</div>
      </div>
    </section>
  );
};

export default React.memo(Wrapper);
