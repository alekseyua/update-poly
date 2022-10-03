import React from 'react';
import { useStoreon } from 'storeon/react';
import FormAddReview from '../AddReview/AddReviewBlock/FormAddReview'

const AddReviewContainer =({
    productId,
    profileId,
}) => {
    const { dispatch } = useStoreon();

    const sendReview = (data, options) => {
        console.log('options  Data = ', options)
        const params = {
            iAgreeDataProcessing: data.iAgreeDataProcessing,
            files: data.uploadFiles,
            content: data.content,
            stars: data.stars,
    
            product: data.productId,
            profile: data.profileId,

            // callbackResult: 
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