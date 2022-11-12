import React from 'react';
import classNames from 'classnames';
import { btnDown } from '../../../images';
import Button from '../../Button';
import Icon from '../../Icon';

import style from './styles/index.module.scss';

const ListTable = ({ handlerSpecification, count, activeButtonSpecification = false }) => {
  return (
    <div className={style['cabinet-orders-details__list-head']}>
      <div className={style['cabinet-orders-details__list-title']}>Товаров в заказе ({count})</div>

      <Button
        disabled = { activeButtonSpecification }
        variant="text"
        download
        onClick = { handlerSpecification }
        size="sm"
        className={classNames({
          [style['cabinet-orders-details__link--blue']]: true,
          [style['cabinet-orders-details__list-link']]: true,
        })}
      >
        <Icon slot="icon-left" src={btnDown} width = { 20 } height = { 20 } />
          Скачать спецификацию
      </Button>
    </div>
  );
};
export default React.memo(ListTable);
