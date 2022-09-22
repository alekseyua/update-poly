import React, { useState } from 'react';
import MainReviewsLayout from './MainReviewsLayout';

// const apiContent = api.contentApi;
const MainReviews = ({ product_reviews, service_reviews, reviews_url, profileId, front_admin }) => {
  return (
    <MainReviewsLayout
      product_reviews={product_reviews}
      service_reviews={service_reviews}
      reviews_url={reviews_url}
      profileId={profileId}
      front_admin = {front_admin}
    />
  );
};
export default React.memo(MainReviews);
