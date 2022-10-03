import React from 'react';
import Text from '../../../../helpers/Text';
import classNames from 'classnames';
import style from '../styles/addreview.module.scss';

const FormAddReview = ({ children, full }) => {

 
  return (
    <div
      className={classNames({
        [style['productreviews__form']]: true,
        [style['productreviews__form--full']]: full,
      })}
    >
      <h3 className={style['productreviews__form-title']}>
        <Text text={'leave.a.review'} />
      </h3>
      {children}
    </div>
  );
};

export default React.memo(FormAddReview);
