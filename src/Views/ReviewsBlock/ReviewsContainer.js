import React from 'react';
import BlockReviews from './ReviewsData/index';
import { useStoreon } from 'storeon/react';

const ReviewsContainer = ({
  reviews_statistic,
  pageReviewProduct,
  reviews_count,
  profileId,
  productId,

  dataReviewProductCount = null,
  product_reviews,
  
  
}) => {
  
  
  const { dispatch } = useStoreon();
  
  const canselationCallback = () => {
    console.log('I don`t know now')
  }
  
  const showMore = (productId, page) => {
    console.log('show more reviews ...')
    const params = {
      productId: productId,
      page: page
    }
    dispatch('getReviewsProducts', params)
  }
  
  const openModalFinalyAddReview = () =>{
    console.log('Должна появиться модальная форма с добавлением отзыва')
  }

console.log('pageReviewProduct = ', pageReviewProduct)
  return (
    <BlockReviews.SectionReviews>
        <BlockReviews.ReviewsRow>
          <BlockReviews.ReviewsLeftSide
            openModalFinalyAddReview={openModalFinalyAddReview}
            canselationCallback={canselationCallback}
            showMore={showMore}

            pageReviewProduct={pageReviewProduct}
            product_reviews={product_reviews}
            count={dataReviewProductCount}
            reviews_count={reviews_count}
            profileId={profileId}
            productId={productId}
          />
          <BlockReviews.ReviewsRightSide reviews_statistic={reviews_statistic} />
        </BlockReviews.ReviewsRow>
    </BlockReviews.SectionReviews>
  );
};

export default React.memo(ReviewsContainer);
