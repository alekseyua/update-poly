import React from 'react';
import Form from '../../../Form';
import ReviewsElementBlock from '../AddReviewsElement';
import { Formik } from 'formik';
import { Captcha } from '../Captha';


import style from '../styles/addreview.module.scss';
import Text from '../../../../helpers/Text';
import { reviewInitialState } from '../../../../helpers/initialValues/initialValues';
import AddUploadFiles from '../../../AddFiles';

const ModalAddReview = ({
  sendReview,
  productId,
  profileId,
}) => {


  return (
    <Formik
      enableReinitialize
      initialValues={reviewInitialState}
      onSubmit={sendReview}
    >
      {({ handleSubmit, values, setFieldValue, handleBlur, handleChange }) => {

       const canselationCallback = (e) => {
          let arr = [];
          !!values?.uploadFiles?(
            arr = Array.from(values?.uploadFiles),
            setFieldValue('uploadFiles', [])
          ): null;
          setFieldValue('content', '');
          setFieldValue('stars', 0);
          !!values.iAgreeDataProcessing? setFieldValue('iAgreeDataProcessing', false): null;
          setFieldValue( 'activeButton', true )
        }
        return (
          <Form novalidate onChange={handleSubmit}>
            <ReviewsElementBlock.FormAddReview>
              <textarea
                value={!!values.content ? values.content : ''}
                onChange = { (e) => { 
                  values.content && !!values.stars && values.iAgreeDataProcessing && !!values.uploadFiles.length? setFieldValue( 'activeButton', false ) : null;
                  handleChange(e)
                }}
                className={style["productreviews__form-textarea"]}
                placeholder={Text({text: 'text-review'})}
                name={'content'}
              ></textarea>

              {/* <ReviewsElementBlock.FormAddReviewUploadImage
                values={values}
                setFieldValue={setFieldValue}
              /> */}
              <AddUploadFiles
                name={'uploadFiles'}
                type={'file'}
                className={'wrapperBtnFile'}
                label={'Прикрепить изображение:'}
                accept={'.png, .jpg, .jpeg, .mp4'}
                countFiles = { values.uploadFiles ?? 0}
                onBlur={handleBlur}
                multiple={null}
                setFieldValue={setFieldValue}
                onChange = { (e) => { 
                  values.content && !!values.stars && values.iAgreeDataProcessing && e.currentTarget.files? setFieldValue( 'activeButton', false ) : null;
                }}
              />


              <ReviewsElementBlock.FormAddReviewRating
                values={values}
                setFieldValue={setFieldValue}
                onChange = { (e) => { 
                  values.content && !!values.stars && values.iAgreeDataProcessing && !!values.uploadFiles.length? setFieldValue( 'activeButton', false ) : null;
                }}
              />

              {/* <Captcha
                name={'review_product'}
                handleValue={(value) => {
                  setFieldValue('recaptcha', value);
                }}
              /> */}

              <ReviewsElementBlock.FormAddReviewController
                values={values}
                setFieldValue={setFieldValue}
                canselationCallback={canselationCallback}
                handleSubmit={handleSubmit}
                productId={productId}
                profileId={profileId}
                onChange = { (value) => { 

                  values.content && !!values.stars && value && !!values.uploadFiles.length? setFieldValue( 'activeButton', false ) : null;
                }}
              />

            </ReviewsElementBlock.FormAddReview>
          </Form>
        );
      }}
    </Formik>
  );
};

export default React.memo(ModalAddReview);
