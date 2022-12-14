import React from 'react';
import { useStoreon } from 'storeon/react';
import ReviewsPersonalPageLayout from './ReviewsPersonalPageLayout';

const ReviewsPersonalPageLayoutContainer = ({
    amountNotifications,
    cabinet_site_menu,
    getMyReviewList,
    cabinet_menu,
    breadcrumbs,
    create_shop,
    is_has_shop,
    isLoading,
    currency,
    username,
    balance,
    shop,
    role,
}) => {
    const { dispatch } = useStoreon();

    const changePaginationsMyReviews = (page) => {
        const params = {
            page: page
        }
        dispatch('getMyReviewList', params)
    }
    const openModalAddReview = () => {
        dispatch('addReview')
    }

    return (
        <ReviewsPersonalPageLayout
            amountNotifications={amountNotifications}
            cabinet_site_menu={cabinet_site_menu}
            getMyReviewList={getMyReviewList}
            cabinet_menu={cabinet_menu}
            create_shop={create_shop}
            is_has_shop={is_has_shop}
            breadcrumbs={breadcrumbs}
            isLoading={isLoading}
            currency={currency}
            username={username}
            balance={balance}
            shop={shop}
            role={role}

            openModalAddReview={openModalAddReview}
            changePaginationsMyReviews={changePaginationsMyReviews}
        />
    )
}

export default ReviewsPersonalPageLayoutContainer;