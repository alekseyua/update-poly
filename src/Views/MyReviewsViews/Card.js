import React from 'react';
import classNames from 'classnames';
import { arrowDown, likeIcon } from '../../images';
import Raiting from '../Raiting';
import api from '../../api/api';
import dayjs from '../../helpers/dayjs';
import Icon from '../Icon';

import style from './styles/index.module.scss';

const Card = ({
  content,
  created_at,
  id,
  likes_count,
  likes_count_add = '10',
  review_photos,
  stars,
  status,
  review_type,
}) => {

  const widthScreen = window.innerWidth;
  const getPlusPhoto = () => {
    if (widthScreen <= 375) {
      if (Number(Math.sign(review_photos.length - 3)) !== -1) return `+${review_photos.length - 3}`;
    } else {
      if (Number(Math.sign(review_photos.length - 4) !== -1)) return `+${review_photos.length - 4}`;
    }
    return null;
  };
  return (
    <div 
      className={style['cabinet-history__card']}    
    >
      <details className={style['cabinet-history__card-more']}>
        <summary className={style['cabinet-history__card-top']}>
          <div className={style['cabinet-history__card-product']}>
            <div> 
              <p className={style['cabinet-history__card-head']}>{review_type.type}</p>
              <p className={style['cabinet-history__card-text']}>{review_type.product}</p>
            </div>
            <div className={style['cabinet-history__card-image-wrap']}>
              {              
                review_photos.map((el, i) => {
                  if (widthScreen <= 375) {
                    if (i < 2) {
                      return (
                        <img
                          key={`img-review-${i}`}
                          className={style['cabinet-history__card-image']}
                          src={el.image_thumb}
                          width="50px"
                          height="50px"
                          alt={'min image card'}
                        />
                      );
                    }
                  } else {
                    if (i < 3) {
                      return (
                        <img
                          key={`img-review-${i}`}
                          className={style['cabinet-history__card-image']}
                          src={el.image_thumb}
                          width="50px"
                          height="50px"
                          alt={'min image card'}
                        />
                      );
                    }
                  }
                })
              }
              <p className={style['cabinet-history__card-image-counter']}>{getPlusPhoto()}</p>
            </div>
          </div>
          <div className={style['cabinet-history__card-publication']}>
            <div>
              <p className={style['cabinet-history__card-head']}>
                {dayjs(api.language, created_at).format('DD.MM.YYYY')}
              </p>
              {/* <p className={style['cabinet-history__card-text']}>34 бонуса (-ов)</p> */}
            </div>
            <div className={style['cabinet-history__card-bonus-wrap']}>
              <div className={style['cabinet-history__card-bonus-likes-wrap']}>
                <Icon src={likeIcon} className={style['cabinet-history__card-bonus-icon']} height={20} width={20}/>
                <p className={style['cabinet-history__card-bonus-likes']}>{likes_count}</p>
              </div>
              <p className={style['cabinet-history__card-bonus-plus']}>
                +{likes_count_add ? likes_count_add : '0'}
              </p>
            </div>
          </div>
          <div className={style['cabinet-history__card-revstatus']}>
            <p
              className={classNames({
                [style['cabinet-history__card-status']]: true,
                [style['cabinet-history__card-status-onmoder']]: status === 'На модерации',
                [style['cabinet-history__card-status-reject']]: status === 'Отклонено',
                [style['cabinet-history__card-status-published']]: status === 'Опубликовано',
              })}
            >
              {status}
            </p>
            <Icon src={arrowDown} className={style['cabinet-history__card-revstatus-icon']} height={20} width={20}/>
          </div>
        </summary>
        <div className={style['cabinet-history__card-details']}>
          <h3 className={style['cabinet-history__card-details-head']}>Текст отзыва</h3>
          <div className={style['cabinet-history__card-details-line']}></div>
          <p className={style['cabinet-history__card-details-text']}>
            <div dangerouslySetInnerHTML={{ __html: content ? content : "" }}></div>
          </p>
          <div className={style['cabinet-history__card-details-wrap']}>
            <p className={style['cabinet-history__card-details-desc']}>Фото или видео:</p>
            {review_photos.map((el, i) => {
              return (
                <img
                  key = { `image-review--${el.review}`}
                  className={style['cabinet-history__card-image']}
                  src={el.image_thumb}
                  width="50px"
                  height="50px"
                  alt={'image thumb'}
                />
              );
            })}
          </div>
          <div className={style['cabinet-history__card-details-wrap']}>
            <p className={style['cabinet-history__card-details-desc']}>Оценка:</p>
            <Raiting disabled max={5} value={stars} />
          </div>
        </div>
      </details>
    </div>
  );
};

export default React.memo(Card);
