import React from 'react';
import style from './styles/wrapper.module.scss';

const WrapperPage = ({ rightChildComponent = null, leftChildComponent = null }) => {
  return (
    <div className={style['cabinet']}>
      <div className={'cabinet__container'}>
        <div className={style['cabinet-row']}>
          <div className={style['cabinet-left-col']}>{leftChildComponent}</div>
          <div className={style['cabinet-right-col']}>{rightChildComponent}</div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(WrapperPage);
