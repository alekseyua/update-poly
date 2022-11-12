import React from 'react';
import style from './styles/index.module.scss';

const HistoryHead = ({}) => {
  return (
    <div className={style['cabinet-history__top']}>
      <p className={style['cabinet-history__top-head']}>Отзыв</p>
      <p className={style['cabinet-history__top-head']}>Дата публикации и баллы</p>
      <p className={style['cabinet-history__top-head']}>Статус отзыва</p>
    </div>
  );
};

export default React.memo(HistoryHead);
