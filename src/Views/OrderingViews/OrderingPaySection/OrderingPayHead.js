import React from 'react';
import Title from '../../Title';
import Text from '../../../helpers/Text';
import { wallet } from '../../../images';

import style from '../styles/index.module.scss';
import Icon from '../../Icon';

const OrderingPayHead = ({}) => {
  return (
    <div className={style['ordering__pay-head-wrap']}>
      <Icon src={wallet} className={style['ordering__icon']} />
      <Title variant={'cart'} type={'h2'}>
        <Text text="payment.method" />
      </Title>
    </div>
  );
};
export default React.memo(OrderingPayHead);
