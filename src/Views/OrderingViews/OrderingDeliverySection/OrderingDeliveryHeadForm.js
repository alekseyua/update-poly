import React from 'react';
import classNames from 'classnames';

import style from '../styles/index.module.scss';
import Button from '../../Button';

const OrderingDeliveryHeadForm = ({ waitForCall, setFieldValue, delivery_condition }) => {
  return (
    <div className={style['ordering__delivery-form-top']}>
      <div dangerouslySetInnerHTML={{ __html: delivery_condition }}></div>
      <Button
        onClick={() => {
          setFieldValue('waitForCall', !waitForCall);
        }}
        className={classNames({
          [style['ordering__delivery-form-btn']]: true,
          [style['ordering__delivery-form-btn--active']]: waitForCall,
        })}
      >
        дождаться звонка
      </Button>
    </div>
  );
};
export default React.memo(OrderingDeliveryHeadForm);
