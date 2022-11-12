import React from 'react';
import { addressIcon } from '../../../images'
import Title from '../../Title';
import Text from '../../../helpers/Text'

import style from '../styles/index.module.scss';
import Icon from '../../Icon';

const OrderingAddressHead = ({ }) => {
  return (
    <React.Fragment>
      <div className={style['ordering__pay-head-wrap']}>
        <Icon src={addressIcon} className={style['ordering__icon']} height={20} width={20}/>
        <Title variant={'cart'} type={'h2'}>
          <Text text="addres.delivery" />
        </Title>
      </div>
      <p className={style['ordering__desc']}>
        Укажите адрес, по которому хотите получить заказ.
        <br />
        Вы можете выбрать адрес из сохранённых в личном кабинете либо добавить новый.
      </p>
    </React.Fragment>
  );
};
export default React.memo(OrderingAddressHead);
