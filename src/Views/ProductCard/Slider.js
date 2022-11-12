import { useEffect, useRef, useState } from 'react';
import Swiper from 'swiper';
import style from './productCard.module.scss';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const Slider = ({ images, url }) => {

  const swiperRef = useRef(null);
  const paginationRef = useRef(null);
  const [ clickDisables, setClickDisables] = useState(true)
  //todo: добавить данные из контекста убрать хардкод
  useEffect(() => {
    const swiper = new Swiper(swiperRef.current, {
      speed: Math.random(400, 1200) * 1000,
      slidesPerView: 1,
      observer: true,
      // autoplay: true,
      observeParents: true,
      loop: false,
      pagination: {
        el: paginationRef.current,
        type: 'bullets',
      },
    });
  }, []);

  return (
    <div
      ref={swiperRef}
      className={classNames({
        [style['product-card__slider']]: true,
      })}
    >
      <div className={classNames({
                [style['product-card__image-container']]: true,
                'swiper-wrapper': true,
              })}
      >
        {images.map((el, i) => {
          return (
            <Link
              className={classNames({
                [style['product-card__image']]: true,
                'swiper-slide': true,
              })}
              key={i}
              to={`/${url}`}             
            >
              <div>
                <div className={style['product-card__image-item']}>
                  <img
                    loading={'eager'}
                    className={style['product-card__image-img']}
                    src={el}
                    alt={'product-card__image-img'}
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      
      <div
        ref={paginationRef}
        className={classNames({
          [style['product-card__slider-pagination']]: true,
          'swiper-pagination': true,
        })}
      >
        <div
          className={classNames({
            [style['product-card__slider-pagination-bullet']]: true,
            'swiper-pagination-bullet': true,
          })}
        ></div>
      </div>
    </div>
  );
};

export default React.memo(Slider);
