import React from 'react';
import Title from '../../Title';
import { truck } from '../../../images';
import Text from '../../../helpers/Text';
import Icon from '../../Icon';

import style from '../styles/index.module.scss';

const OrderingDeliveryHead = ({}) => {
  return (
    <div className={style['ordering__pay-head-wrap']}>
      <Icon src={truck} className={style['ordering__icon']} height={20} width={20}/>
      <Title variant={'cart'} type={'h2'}>
        <Text text="delivery.method" />
      </Title>
    </div>
  );
};

export default React.memo(OrderingDeliveryHead);
