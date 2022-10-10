import React from 'react';
import { useStoreon } from 'storeon/react';
import WishPageLayout from './WishPageLayout';

const WishPageLayoutContainer = ({  
    recomendetProducts, 
    breadcrumbs,
    list_wishes,
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
        recomendetProducts = { recomendetProducts }
        breadcrumbs = { breadcrumbs }
        list_wishes = { list_wishes }
        wishlist = { wishlist }
        currency = { currency }

        changePaginationsWishList = { changePaginationsWishList }
        />
    )
}

export default WishPageLayoutContainer;