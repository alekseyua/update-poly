import React from 'react';
import { statusCancel, statusSend } from '../../../../images';
import Icon from '../../../../Views/Icon';
import classNames from 'classnames';

import style from './styles/cartpage.module.scss';

const successMessesnge =
  'Условие минимального заказа выполнено! Размерный ряд одной модели в одном цвете';
const rejectMessenge =
  'Условие минимального заказа не выполнено! Размерный ряд одной модели в одном цвете';

const SuccesMinOrder = ({
  success = false,
  messenge = rejectMessenge,
}) => {
  return (
    <div
      className={classNames({
        [style['cart-page__wrapper-order']]: true,
        [style['cart-page__wrapper-order--success']]: success,
      })}
    >
      <Icon className={style['cart-page__wrapper-order-icon']} src={success ? statusSend : statusCancel} width={20} height = {20} />
      <span className={style['cart-page__wrapper-order-messenge']}>{messenge}</span>
    </div>
  );
};

export default React.memo(SuccesMinOrder);
