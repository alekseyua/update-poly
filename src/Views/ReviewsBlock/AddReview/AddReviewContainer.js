import React from 'react';
import { useStoreon } from 'storeon/react';
import FormAddReview from '../AddReview/AddReviewBlock/FormAddReview'

const AddReviewContainer =({
    productId,
    profileId,
}) => {
    const { dispatch } = useStoreon();

    const sendReview = (data, dataFormik) => {

        const params = {
            iAgreeDataProcessing: data.iAgreeDataProcessing,
            files: data.uploadFiles,
            content: data.content,
            stars: data.stars,
            product: data.productId,
            profile: data.profileId,
            dataFormik: dataFormik
          };
        dispatch('sendReview', params)
    }

    return(
        <FormAddReview
            sendReview={sendReview}  
            productId={productId}
            profileId={profileId}
        />
    )
}

export default AddReviewContainer