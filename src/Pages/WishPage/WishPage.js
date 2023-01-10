import React from 'react';
import WishPageLayoutContainer from './WishPageLayout/WishPageLayoutContainer';

const WishPage = ({
    context
}) => {

    const {
        breadcrumbs,
        listCurrentOrder,
        info_delivery,
        dataProducts,
        isLoading,
        page_info,
        dataCart,
        currency,
        profile,
    } = context;

    const recomendetProducts = dataProducts?.results;
    const wishlist = profile?.wishlist;
    const list_wishes = profile?.list_wishes;
    return (
        <WishPageLayoutContainer
            recomendetProducts={recomendetProducts}
            breadcrumbs={breadcrumbs}
            list_wishes={list_wishes}
            isLoading={isLoading?.isLoadingMywish}
            wishlist={wishlist}
            currency={currency}
        />
    )
}

export default WishPage;