import React from 'react';
import { NavLink } from 'react-router-dom';
import { defaultImageCard } from '../../images';
import dayjs from '../../helpers/dayjs';

import style from './newsCard.module.scss';

const NewsCard = (props) => {
  const { img, title, date, url = '#', description = '', id } = props;
  
  return (
    <div className={style['news-card']}>
      <div className={style['news-card__wrap']}>
        <NavLink to={url} className={style['news-card__image']} >
          <img src={img && img !== '#' ? img : defaultImageCard} alt={description} />
        </NavLink>
        <div className={style['news-card__info']}>
          <NavLink to={url} className={style['news-card__title']} >
            {title}
          </NavLink>
          <span className={style['news-card__date']}>{dayjs('ru', date).format('DD MMMM YYYY')}</span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(NewsCard);
