import React from 'react';
import YouHaveAlreadyWatchedViews from '../../../Views/YouHaveAlreadyWatchedViews';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import ProductCard from '../../ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';

const RecomendetProduct = ({ recommended = [], currency }) => {


  if (!recommended.length) return null;

  return (
    <YouHaveAlreadyWatchedViews.Wrapper title={'Рекомендуемое'}>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        navigation={recommended.length > 6}
        noSwiping
        spaceBetween={10}
        speed={400}
        slidesPerView={6}
        breakpoints= {{
          // when window width is >= 320px
          320: {
            slidesPerView: 2,
            spaceBetween: 5
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 3,
            spaceBetween: 5
          },
          // when window width is >= 640px
          680: {
            slidesPerView: 4,
            spaceBetween: 5
          },
          960: {
            slidesPerView: 5,
            spaceBetween: 10
          },
          1240: {
            slidesPerView: 6,
            spaceBetween: 20
          }
        }}
        allowTouchMove={false}
      >
        {recommended.map((el, i) => {
          const data = el;
          return (
            <SwiperSlide key={el.id}>
              <ProductCard
                disabledHover
                url={data.url}
                title={data.title}
                id={data.id}
                brand={data.brand}
                is_liked={data.is_liked}
                prices={data.prices}
                stock={data.stock}
                colors={data.colors}
                images={data.images}
                isSales={data.is_closeout} 
                isHit={data.is_bestseller}
                sizes={data.sizes}
                product_rc={data.product_rc}
                currency={currency}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </YouHaveAlreadyWatchedViews.Wrapper>
  );
};

export default React.memo(RecomendetProduct);
