import React from 'react';
import BlockGrid from '../../../../Views/GridContainerBlock';
import Breadcrumbs from '../../../../Views/Breadcrumbs';
import SidebarPersonalPage from '../../DetailsPage/SidebarPersonalPage';
import MyReviews from '../../DetailsPage/MyReviews';


const ReviewsPersonalPageLayout = ({
    cabinet_site_menu,
    getMyReviewList,
    cabinet_menu,
    breadcrumbs,
    create_shop,
    is_has_shop,
    username,
    balance,
    shop,
    role,


    openModalAddReview,
    changePaginationsMyReviews,
}) => {

    return (
        <React.Fragment>
            <BlockGrid.Container>
                <Breadcrumbs breadcrumbs={breadcrumbs} />
                    <BlockGrid.GridPageLK>
                        
                        <BlockGrid.GridPageLeftLK>
                            <SidebarPersonalPage
                                shop={shop}
                                create_shop={create_shop}
                                is_has_shop={is_has_shop}
                                cabinet_menu={cabinet_menu}
                                cabinet_site_menu={cabinet_site_menu}
                                balance={balance}
                                username={username}
                                role={role}
                            />
                        </BlockGrid.GridPageLeftLK>
                        <BlockGrid.GridPageRightLK>
                            <MyReviews
                                getMyReviewList  = { getMyReviewList }
                                openModalAddReview = { openModalAddReview }
                                changePaginationsMyReviews = { changePaginationsMyReviews }
                            />
                        </BlockGrid.GridPageRightLK>
                    </BlockGrid.GridPageLK>
            </BlockGrid.Container>
        </React.Fragment>
    )
}

export default ReviewsPersonalPageLayout;