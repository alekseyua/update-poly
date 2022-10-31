import React from 'react';
import Text from '../../../../helpers/Text';
import Raiting from '../../../Raiting/RaitingView';

import style from '../styles/addreview.module.scss';

const FormAddReviewRating = ({ values, setFieldValue, onChange }) => {

  return (
    <p className={style['productreviews__form-raiting']}>
      <span>
        <Text text={'evaluation'} />:
      </span>
      <Raiting
        onChange={(e) => {
          const value = +e.target.parentElement.getAttribute('value') + 1;
          setFieldValue('stars', value);
          onChange(e, value)
        }}
        className={style['productreviews__form-rating-indicator']}
        ActiveStar={+values?.stars}
      />
    </p>
  );
};

export default React.memo(FormAddReviewRating);
