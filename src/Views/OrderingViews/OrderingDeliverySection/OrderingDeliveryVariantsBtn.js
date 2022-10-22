import React from 'react';
import classNames from 'classnames';
import {statusSend} from '../../../images';
import Button from '../../Button';
import Icon from '../../Icon';
import { v4 } from 'uuid'
import ToolTip from '../../ToolTip';

import style from '../styles/index.module.scss';

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
            className = { style['ordering__button-tooltip'] }
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
                    className={style['ordering__button-card-icon-select']}
                    height={20} 
                    width={20}
                  />
                  :<div
                  className = { style['ordering__button-card-empty-select']}
                ></div>
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
