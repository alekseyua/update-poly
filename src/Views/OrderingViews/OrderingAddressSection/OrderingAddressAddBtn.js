import React from 'react';
import Button from '../../Button';

import style from '../styles/index.module.scss';

const OrderingAddressAddBtn = ({ onClick, buttonText = '+ добавить новый адрес' }) => {
   return (
    <Button
      onClick={onClick}
      type="text"
      className={style['ordering__address-card-newbtn']}
    >
      {buttonText}
    </Button>
  );
};

export default React.memo(OrderingAddressAddBtn);
