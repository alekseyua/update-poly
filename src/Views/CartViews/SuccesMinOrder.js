import React from 'react';
import { statusCancel, statusSend } from '../../images';
import Icon from '../../Views/Icon';
import classNames from 'classnames';
import style from './styles/index.module.scss';

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
        [style['cart-views__wrapper-order']]: true,
        [style['cart-views__wrapper-order--success']]: success,
      })}
    >
      <Icon className={style['cart-views__wrapper-order-icon']} src={success ? statusSend : statusCancel} />
      <span className={style['cart-views__wrapper-order-messenge']}>{messenge}</span>
    </div>
  );
};

export default React.memo(SuccesMinOrder);
