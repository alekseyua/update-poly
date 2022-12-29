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
          !!values?.uploadFiles ? (
            arr = Array.from(values?.uploadFiles),
            setFieldValue('uploadFiles', [])
          ) : null;
          setFieldValue('content', '');
          setFieldValue('stars', 0);
          !!!values.iAgreeDataProcessing ? setFieldValue('iAgreeDataProcessing', true) : null;
          setFieldValue('activeButton', true)
        }
        return (
          <Form novalidate onChange={handleSubmit}>
            <ReviewsElementBlock.FormAddReview>
              <textarea
                value={!!values.content ? values.content : ''}
                onChange={(e) => {
                  !!e.target.value && !!values.stars ? setFieldValue('activeButton', false) : setFieldValue('activeButton', true);// проверка без изображения
                  handleChange(e)
                }}
                className={style["productreviews__form-textarea"]}
                placeholder={Text({ text: 'text-review' })}
                name={'content'}
              ></textarea>
              <AddUploadFiles
                name={'uploadFiles'}
                type={'file'}
                className={'wrapperBtnFile'}
                label={'Прикрепить изображение:'}
                accept={'.png, .jpg, .jpeg, .mp4'}
                countFiles={values.uploadFiles ?? 0}
                onBlur={handleBlur}
                multiple={null}
                setFieldValue={setFieldValue}
                onChange={(e) => {
                  !!values.content && !!values.stars ? setFieldValue('activeButton', false) : setFieldValue('activeButton', true);// проверка без изображения
                }}
              />

              <ReviewsElementBlock.FormAddReviewRating
                values={values}
                setFieldValue={setFieldValue}
                onChange={(e, countStar) => {
                  !!values.content && !!countStar ? setFieldValue('activeButton', false) : setFieldValue('activeButton', true);// проверка без изображения
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
                onChange={() => {}}
              />

            </ReviewsElementBlock.FormAddReview>
          </Form>
        );
      }}
    </Formik>
  );
};

export default React.memo(ModalAddReview);
