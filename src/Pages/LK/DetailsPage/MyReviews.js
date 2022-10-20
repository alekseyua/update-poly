import React from 'react';
import MyReviewsViews from '../../../Views/MyReviewsViews';
import Pagination from '../../../Views/Pagination';

const MyReviews = ({
    getMyReviewList,
    openModalAddReview,
    changePaginationsMyReviews,
}) => {
    console.log('getMyReviewList',getMyReviewList)

    return (
        <React.Fragment>
            <MyReviewsViews.ProfileLevelData 

            openModalAddReview = { openModalAddReview }
            />
             <MyReviewsViews.WrapperHistory>
              <MyReviewsViews.HistoryHead />
                {
                    getMyReviewList?.results?
                        getMyReviewList.results.sort((a,b)=> b.id - a.id).map((el, i) => {
                            return  <MyReviewsViews.Card 
                                        key = { `card-review-${el.id}` }

                                        // i = { i } 
                                        {...el} 
                                    />;
                        })
                    : null
                }
                <Pagination allCount={getMyReviewList?.count} count={10} handlerChangePaginations={changePaginationsMyReviews} />
            </MyReviewsViews.WrapperHistory> 
        </React.Fragment>
        
    )
}

export default MyReviews;