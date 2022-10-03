import React from 'react';
import style from './styles/index.module.scss';

const FirstSliderWrapper = ({ children }) => {
  return (
    <div className={style['first-slider__wrapper']}>
      <div className={style['first-slider__gallery--vertical']}>{children}</div>
    </div>
  );
};

export default React.memo(FirstSliderWrapper);
