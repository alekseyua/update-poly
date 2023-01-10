import React from 'react';
import MyReviewsViews from '../../../Views/MyReviewsViews';
import Offset from '../../../Views/Offset';
import Pagination from '../../../Views/Pagination';
import Title from '../../../Views/Title';
import BlockSpinner from '../../../Views/SpinnerWrapper';

const MyReviews = ({
    isLoading,
    getMyReviewList,
    openModalAddReview,
    changePaginationsMyReviews,
}) => {

    return (
        <React.Fragment>
            <MyReviewsViews.ProfileLevelData

                openModalAddReview={openModalAddReview}
            />
            <MyReviewsViews.WrapperHistory>
                <MyReviewsViews.HistoryHead />
                {
                    isLoading ?
                        getMyReviewList?.results ?
                            getMyReviewList.results.sort((a, b) => b.id - a.id).map((el, i) => {
                                return <MyReviewsViews.Card
                                    key={`card-review-${el.id}`}

                                    // i = { i } 
                                    {...el}
                                />;
                            })
                            : <Title variant={'lk-message'} type={'h1'}>
                                <Offset offset={20} />
                                    У Вас нет ни одного оставленного отзыва
                                <Offset offset={20} />
                            </Title>
                        :
                        <BlockSpinner.SpinnerWrapper>
                            <BlockSpinner.Spinner sizeWidth={40} sizeHeight={40} />
                        </BlockSpinner.SpinnerWrapper>
                }
                <Pagination allCount={getMyReviewList?.count} count={10} handlerChangePaginations={changePaginationsMyReviews} />
            </MyReviewsViews.WrapperHistory>
        </React.Fragment>

    )
}

export default MyReviews;