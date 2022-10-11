import React from 'react';
import ReviewsCard from '../../ReviewsCard';
import Text from '../../../helpers/Text';
import AddReviewContainer from '../AddReview/AddReviewContainer';
import ShowMoreBtn from '../../InformationViews/ShowMoreBtn';
import BlockSpinner from '../../SpinnerWrapper';

import style from '../styles/reviews.module.scss';
// const contentApi = api.contentApi;

const ReviewsLeftSide = ({
  pageReviewProduct,
  product_reviews,
  reviews_count,
  profileId,
  productId,
  count,  
  showMore = () => { },
  
}) => {
  // console.log('*******************************',{product_reviews})

  return (

    <div>
      {
        !!reviews_count ?
          !!product_reviews.length ?
            <div className={style['reviews__left-side-wrapper']}>
              {
                reviews_count ? (
                  <h2 className={style['reviews__title']}>
                    <Text text={'reviews-es'} /> ({reviews_count})
                  </h2>
                ) : null
              }
              <ul className={style['reviews__reviews-list']}>
                {
                  product_reviews.map((el) => {
                    delete el['product_url'];
                    return (
                      <li key={el.id} className={style['reviews__item']}>
                        <ReviewsCard disabledLinkToProduct {...el} profileId={profileId} />
                      </li>
                    );
                  })
                }
              </ul>
              {
                product_reviews.length < 5 ? null : (
                  <ShowMoreBtn
                    pageNow={pageReviewProduct}
                    productId={productId}
                    onClick={showMore}
                    allCount={count}
                    currentCount={product_reviews.length}
                  />
                )
              }
              <div className={style['reviews__reviews-list-mb']}></div>

            </div>
            : <BlockSpinner.SpinnerWrapper>
              <BlockSpinner.Spinner />
            </BlockSpinner.SpinnerWrapper>
          : null
        }
        <AddReviewContainer
          productId={productId}
          profileId={profileId}
        />
        
    </div>
  );
};

export default React.memo(ReviewsLeftSide);