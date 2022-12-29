import React from 'react';
import Layout from '../Views';
import ReviewsPageComponent from '../components/ReviewsPageComponent';
import Modal from '../Views/ModalCreator';
import InformationReviewsLayoutContainer from './InformationReviewsLayout/InformationReviewsLayoutContainer';


const InformationReviews = (props) => {

  const { breadcrumbs, page_info, reviews, site_configuration, profile } = props.context;
  const { id } = profile;
  const { title } = page_info;
  const { insta_link } = site_configuration

  return (
    <InformationReviewsLayoutContainer
      title={title}
      breadcrumbs={breadcrumbs}
      reviews={reviews}
      insta_link={insta_link}
      profile={id}
    />
  );
};

export default React.memo(InformationReviews);
