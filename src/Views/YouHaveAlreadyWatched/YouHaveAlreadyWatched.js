import React from 'react';
import YouHaveAlreadyWatchedViews from '../../Views/YouHaveAlreadyWatchedViews';
import ProductCard from '../../Views/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/scss';
import 'swiper/scss/navigation';
import Text from '../../helpers/Text';
import BlockSpinner from '../../Views/SpinnerWrapper';
const YouHaveAlreadyWatched = ({
  listAlreadySaw,
  currency,
}) => {



  return (
    <YouHaveAlreadyWatchedViews.Wrapper title={Text({text: 'already.watched'})}>
    { 
      !!listAlreadySaw.length?
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          navigation={listAlreadySaw.length > 6}
          noSwiping
          spaceBetween={10}
          speed={400}
          slidesPerView={6}
          observer={true}
          observeSlideChildren
          watchSlidesProgress= {true}
          breakpoints={{
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
          allowTouchMove={true}

        >
          {listAlreadySaw.map((el, i) => {
            const data = el.product;
            return (
              <SwiperSlide key={`swiper-slide-you-have-watch-${i}`}>
                <ProductCard
                  disabledHover
                  url={data.url}
                  title={data.title}
                  id={data.id}
                  brand={data.brand}
                  favorite={data.is_liked}
                  prices={data.prices}
                  stock={data.stock}
                  colors={data.colors}
                  images={data.images}
                  isSales={data.is_closeout}
                  isNew={data.is_new}
                  isHit={data.is_bestseller}
                  sizes={data.sizes}
                  product_rc={data.product_rc}
                  currency={currency}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
        : <BlockSpinner.SpinnerWrapper>
          <BlockSpinner.SpinnerCenter>
            <BlockSpinner.Spinner sizeWidth={50} sizeHeight={50} />
          </BlockSpinner.SpinnerCenter>
        </BlockSpinner.SpinnerWrapper>
    }
    </YouHaveAlreadyWatchedViews.Wrapper>
  );
};

export default React.memo(YouHaveAlreadyWatched);
