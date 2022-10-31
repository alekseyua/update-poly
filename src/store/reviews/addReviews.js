import * as React from "react"
import AddReviewContainer from "../../Views/ReviewsBlock/AddReview/AddReviewContainer";


export const addReviewsFunc = (closeModalState) => {
    return (
        <AddReviewContainer
            closeModalState = { closeModalState }
        />
    )
}