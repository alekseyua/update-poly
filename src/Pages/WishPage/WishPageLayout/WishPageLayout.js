import React from 'react';
import Breadcrumbs from '../../../Views/Breadcrumbs';
import BlockGrid from '../../../Views/GridContainerBlock';
import DefaultWishPagePreview from './DefaultWishPagePreview';
import MyWishList from './DetailsPage/MyWishList';


const WishPageLayout = ({
    recomendetProducts,
    breadcrumbs,
    list_wishes,
    isLoading,
    currency,
    wishlist,
    role,

    changePaginationsWishList,
}) => {

   
    return (
        <BlockGrid.Container>            
            <MyWishList
                changePaginationsWishList={changePaginationsWishList}
                recomendetProducts={recomendetProducts}
                breadcrumbs={breadcrumbs}
                list_wishes={list_wishes}
                isLoading={isLoading}
                currency={currency}
            />
        </BlockGrid.Container>
    )
}

export default WishPageLayout;