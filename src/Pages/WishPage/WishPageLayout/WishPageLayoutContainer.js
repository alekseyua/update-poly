import React from 'react';
import { useStoreon } from 'storeon/react';
import WishPageLayout from './WishPageLayout';

const WishPageLayoutContainer = ({
    recomendetProducts,
    breadcrumbs,
    list_wishes,
    isLoading,
    currency,
    wishlist,
    role,
}) => {
    const { dispatch } = useStoreon();

    const changePaginationsWishList = (page) => {
        const params = {
            page: page
        }
        dispatch('getWishlist', params)
    }

    return (
        <WishPageLayout
            changePaginationsWishList={changePaginationsWishList}
            recomendetProducts={recomendetProducts}
            breadcrumbs={breadcrumbs}
            list_wishes={list_wishes}
            isLoading={isLoading}
            wishlist={wishlist}
            currency={currency}

        />
    )
}

export default WishPageLayoutContainer;