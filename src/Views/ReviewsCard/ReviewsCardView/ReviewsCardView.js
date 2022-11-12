import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import RaitingContainer from '../../Raiting';
import { likeIcon, productCard1, tagIcon, playIcon } from '../../../images';
import Text from '../../../helpers/Text';
import Icon from '../../Icon';
import dayjs from '../../../helpers/dayjs';

import style from './reviewsCard.module.scss';
import api from '../../../api/api';

const ReviewsCardView = ({
  blockEnableView,
  content,
  created_at,
  id,
  likes_count,
  isLiked,
  product,
  product_url,
  review_photos = [],
  review_videos = [],
  stars = 2,
  updated_at,
  user,
  user_rating,
  setLike,
  openModalVideo,
  openModalImage,
}) => {
  
  return (
    <div
      className={classNames({
        [style['reviews-card']]: true,
        [style['reviews-card--block']]: blockEnableView,
      })}
    >
      <div className={style['reviews-card__header']}>
        <div className={style['reviews-card__header--left']}>
          <span className={style['reviews-card__username']}>{user}</span>
          <div className={style['reviews-card__tag']}>
            <Icon className={style['reviews-card__tag-img']} src={tagIcon} alt="card tag" height={20} width={20}/>
            <span className={style['reviews-card__tag-name']}>{user_rating.rating_title}</span>
          </div>
        </div>
        <div className={style['reviews-card__header--right']}>
          {product_url ? (
            <NavLink to={`/${product_url}`} className={style['reviews-card__product-page']}>
              <Text text={'productPage'} />
            </NavLink>
          ) : null}
          <span className={style['reviews-card__date']}>{dayjs(api.language, created_at).format('DD MMMM YYYY')}</span>
        </div>
      </div>
      <div className={style['reviews-card__rating']}>
        <RaitingContainer disabled max={5} value={stars} />
      </div>
      <div
        className={style['reviews-card__content']}
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
      <div className={style['reviews-card__footer']}>
        <div className={style['reviews-card__thumbnails']}>
          {review_videos.map((el) => {
            return (
              <div
                onClick={() => openModalVideo(el)}
                className={style['reviews-card__video']}
                key={el.review}
              >
                <img src={productCard1} alt={'image review'} />
              </div>
            );
          })}
          {review_photos.map((el) => {
            return (
              <div
                onClick={() => openModalImage(el)}
                className={style['reviews-card__photo']}
                key={el.review}
              >
                <img
                  className={style['reviews-card__photo-img']}
                  src={el.image_thumb}
                  alt={'image review'}
                />
              </div>
            );
          })}
        </div>
        <div className={style['reviews-card__like']} 
          onClick={() => setLike(id)}
        >
          <Icon
            className={classNames({
              [style['reviews-card__like-img']]: !isLiked,
              [style['reviews-card__like-img-liked']]: isLiked,
            })}
            src={likeIcon}
            alt="like"
            height={20} width={20}
          />
          <span className={style['reviews-card__like-count']}>{likes_count}</span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ReviewsCardView);
