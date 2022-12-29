import React from 'react';
import ReviewsPersonalPageLayoutContainer from './ReviewsPersonalPageLayout/ReviewsPersonalPageLayoutContainer';

const ReviewsPersonalPage = ({
    context
}) => {

    const {
        cabinet_site_menu,
        cabinet_menu,
        breadcrumbs,
        currency,
        profile,
        reviews,
        shop,
    } = context;

    const { user = {}, role, balance } = profile;
    const amountNotifications = profile?.notifications;
    const getMyReviewList = reviews?.getMyReviewList;
    const { username } = user;

    return (
        <ReviewsPersonalPageLayoutContainer
            amountNotifications={amountNotifications}
            cabinet_site_menu={cabinet_site_menu}
            getMyReviewList={getMyReviewList}
            cabinet_menu={cabinet_menu}
            is_has_shop={shop?.is_has_shop}
            create_shop={shop?.shop_link}
            breadcrumbs={breadcrumbs}
            currency={currency}
            username={username}
            balance={balance}
            reviews={reviews}
            shop={shop}
            role={role}
        />
    )
}

export default ReviewsPersonalPage;