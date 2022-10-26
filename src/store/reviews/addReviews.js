import * as React from "react"
import AddReviewContainer from "../../Views/ReviewsBlock/AddReview/AddReviewContainer";


export const addReviewsFunc = (closeModalState) => {
    console.log('start reviews');
    return (
        <AddReviewContainer
            closeModalState = { closeModalState }
        />
    )
}