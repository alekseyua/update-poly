import React, { startTransition, useEffect, useState } from 'react';
import FiltersReviewsHome from '../../../../Views/FiltersReviewsHome';

import ReviewsCard from '../../../../Views/ReviewsCard';

import MoreLink from '../../../../Views/MoreLink';
import Text from '../../../../helpers/Text';
import Title from '../../../../Views/Title';
// import Settings from '../../#lifehack/Settings/Settings';
import AsyncComponent from '../../../../helpers/asyncComponent';
import { initialFiltersMainReviewsLayout } from '../../../../helpers/initialValues/initialValues';
const AsyncSlider = AsyncComponent(() => {
  return import('../../../../Views/Slider/Slider');
});

import style from './mainReviews.module.scss';
import SpinnerWrapper from '../../../../Views/SpinnerWrapper/SpinnerWrapper';
import Spinner from '../../../../Views/SpinnerWrapper/Spinner';

const MainReviewsLayout = ({ service_reviews, product_reviews, profileId, reviews_url, setModalStates, front_admin }) => {

  const [slides, setSlides] = useState([]);
  const [filters, setFilters] = useState(initialFiltersMainReviewsLayout);
  const setFiltersDec = (data) => {
    setFilters(data);
    if (data[0].active) {
      setSlides(product_reviews);
    } else {
      setSlides(service_reviews);
    }
  };

  useEffect(() => {
    if(filters[0].active){
      setSlides(product_reviews)  
    }else{
      setSlides(service_reviews)
    }

  }, [product_reviews, service_reviews])

  const paramsSlider = {
    slidesPerView: 1,
    spaceBetween: 100,
    speed: 2400,
    observer: true,
    observeParents: true,
    pagination: true,
    navigation: true,
    loop: true,
    // autoplay: {
    //   delay: 5000,
    // },
    autoplay:2000,
    centeredSlides: true,
    watchSlidesProgress: true,
  };

  return (
    <div className={style['main-reviews']}>
      {front_admin ? <Settings nameComponent={'MainReviewsLayout'} /> : null}
      <div className={'main-reviews__container'}>
        <div className={style['main-reviews__wrap']}>
          <Title type={'h2'} variant={'reviews-title'}>
            <Text text={'reviews'} />
          </Title>
          <div className={style['main-reviews__filters']}>
            <FiltersReviewsHome setFilters={setFiltersDec} filters={filters} />
          </div>
          <div className={style['main-reviews__slider']}>
            <div className={style['main-reviews__slider-wrap']}>
              {
                !!slides.length ? (
                  <AsyncSlider
                    paramsSlider={paramsSlider}
                    slidesData={slides}
                    SlideCard={ReviewsCard}
                    profileId={profileId}
                  />
                ) : <SpinnerWrapper>
                      <Spinner className="spiner" />
                    </SpinnerWrapper>
              }
            </div>
          </div>
          <MoreLink url={reviews_url}>
            <Text text={'show_all'} />
          </MoreLink>
        </div>
      </div>
    </div>
  );
};

export default React.memo(MainReviewsLayout);
