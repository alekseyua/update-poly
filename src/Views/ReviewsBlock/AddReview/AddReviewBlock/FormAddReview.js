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
console.log({values})
       const canselationCallback = (e) => {
          let arr = [];
          !!values?.uploadFiles?(
            arr = Array.from(values?.uploadFiles),
            setFieldValue('uploadFiles', [])
          ): null;
          setFieldValue('content', '');
          setFieldValue('stars', 0);
          !!!values.iAgreeDataProcessing? setFieldValue('iAgreeDataProcessing', true): null;
          setFieldValue( 'activeButton', true )
        }
        return (
          <Form novalidate onChange={handleSubmit}>
            <ReviewsElementBlock.FormAddReview>
              <textarea
                value={!!values.content ? values.content : ''}
                onChange = { (e) => { 
                  // console.log('test input text area = ', {values}, { e: e.target.value })
                  !!e.target.value && !!values.stars && !!values.uploadFiles.length? setFieldValue( 'activeButton', false ) : setFieldValue( 'activeButton', true );
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
                  // console.log('test upload', {values}, {e: e.currentTarget.files.length})
                  !!values.content && !!values.stars && !!e.currentTarget.files.length? setFieldValue( 'activeButton', false ) : setFieldValue( 'activeButton', true );
                }}
              />


              <ReviewsElementBlock.FormAddReviewRating
                values={values}
                setFieldValue={setFieldValue}
                onChange = { (e, countStar) => { 
                  // console.log('test star =', {values}, { e: e}, {value})
                  !!values.content && !!countStar && !!values.uploadFiles.length? setFieldValue( 'activeButton', false ) : setFieldValue( 'activeButton', true );
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
                  console.log('test ', {values}, {value})

                  // values.content && !!values.stars && value && !!values.uploadFiles.length? setFieldValue( 'activeButton', false ) : null;
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
