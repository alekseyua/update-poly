import React from 'react';
import classNames from 'classnames';
import {statusSend} from '../../../images';
import Button from '../../Button';
import Icon from '../../Icon';
import { v4 } from 'uuid'

import style from '../styles/index.module.scss';
import ToolTip from '../../ToolTip';

const OrderingDeliveryVariantsBtn = ({ 
  deliveryVariant = [], 
  idEnableBtn,
  values,

  setActiveVariantPayments, 
}) => {
  return (
    <>
      <div className={style['ordering__button-wrap']}>
        {deliveryVariant.map((el) => {
          return (
          <ToolTip
            key={v4()}
            content="сдесь можно выбрать почтовую службу"
            placement="top-start"
          >
            <Button
              key={el.id}
              id={el.id}
              onClick={setActiveVariantPayments}
              variant="text"
              className={classNames({
                [style['ordering__button']]: true,
                [style['ordering__button--active']]: values.variant === el.id,
              })}
            >
              {el.title}
              { 
                values.variant === el.id?
                  <Icon
                    slot="icon-left"
                    src={statusSend}
                    className="cabinet_orders_details__base_info__icon"
                  />
                  :null
              }
            </Button>
          </ToolTip>
          );
        })}
      </div>
    </>
  );
};

export default React.memo(OrderingDeliveryVariantsBtn);
