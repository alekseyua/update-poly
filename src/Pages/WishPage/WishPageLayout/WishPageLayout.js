import React from 'react';
import Breadcrumbs from '../../../Views/Breadcrumbs';
import BlockGrid from '../../../Views/GridContainerBlock';
import DefaultWishPagePreview from './DefaultWishPagePreview';
import MyWishList from './DetailsPage/MyWishList';


const WishPageLayout = ({
    recomendetProducts,
    breadcrumbs,
    list_wishes,
    currency,
    wishlist,
    role,

    changePaginationsWishList,
}) => {

    if ( !!!wishlist ) {
        return <DefaultWishPagePreview
                    recomendetProducts = { recomendetProducts } 
                    breadcrumbs = { breadcrumbs }
                    currency = { currency }
                />;
      }

    return (
        <BlockGrid.Container>
            <Breadcrumbs breadcrumbs={breadcrumbs}/>
            <MyWishList
                list_wishes = { list_wishes }
                currency = { currency }
                
                changePaginationsWishList = { changePaginationsWishList }
            />            
        </BlockGrid.Container>
    )
}

export default WishPageLayout;