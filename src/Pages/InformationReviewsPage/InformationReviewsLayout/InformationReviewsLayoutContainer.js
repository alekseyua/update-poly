import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import InformationReviewsLayout from "./InformationReviewsLayout";
import { useStoreon } from "storeon/react";
import { initialFiltersMainReviewsLayout, initialFetchFiltersReviews, optionsSort } from '../../../helpers/initialValues/initialValues';

const InformationRewievsLayoutComtainer = ({ title, breadcrumbs, reviews, insta_link, profile }) => {
  const { dispatch } = useStoreon();
  const [resultsReversed, setResultsReversed] = useState([]);
  const [filterParams, setFilterParams] = useState(initialFetchFiltersReviews)
  const [filters, setFilters] = useState(initialFiltersMainReviewsLayout);
  const [countReviewsIsMedia, setCountReviewsIsMedia] = useState(0);
  const loadData = (data) => {
    dispatch('filterReviews', data)
  }

  const changeIswithMedia = (e) => {
    const value = e.target.checked;
    if (value) {
      setResultsReversed([])
      setFilterParams(c => ({ ...c, is_with_media: !c.is_with_media }))

      dispatch('filterReviews', {
        ...filterParams,
        is_with_media: !filterParams.is_with_media
      })
    } else {
      setResultsReversed([])
      setFilterParams(c => ({ ...c, is_with_media: !c.is_with_media }))
      dispatch('getReviewsContext', {})
    }
  }

  const setFiltersDec = (data) => {
    setResultsReversed([])
    setFilters(data);
    if (data[0].active) {
      const params = {
        product__isnull: false
      }
      dispatch('filterReviews', params)
    } else {
      const params = {
        product__isnull: true
      }
      dispatch('filterReviews', params)
    }
  };

  const openModalAddReview = () => {
    dispatch('addReview')
  };

  const handlerSelectFilter = (e) => {
    setResultsReversed([])
    const value = e.target.getAttribute('value');
    const params = {
      ordering: value,
      product__isnull: !!!filters[0].active
    }
    dispatch('filterReviews', params)
  }

  const handlerGotoInsta = (url) =>{
    window.open(url, '_blank');
  }

  useEffect(() => {
    if (filters[0].active) {
      setResultsReversed(reviews.product_reviews)
    } else {
      setResultsReversed(reviews.service_reviews)
    }
  }, [reviews])

  return (
    <InformationReviewsLayout
      title={title}
      breadcrumbs={breadcrumbs}
      reviews={reviews}
      optionsSort={optionsSort}
      openModalAddReview={openModalAddReview}
      insta_link={insta_link}
      setFiltersDec={setFiltersDec}
      filters={filters}
      filterParams={filterParams}
      loadData={loadData}
      resultsReversed={resultsReversed}
      changeIswithMedia={changeIswithMedia}
      countReviewsIsMedia={countReviewsIsMedia}
      handlerSelectFilter={handlerSelectFilter}
      handlerGotoInsta={handlerGotoInsta}
    />
  )
}

export default InformationRewievsLayoutComtainer;