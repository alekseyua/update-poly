import React from 'react';
import classNames from 'classnames';
import {statusSend} from '../../../images';
import Button from '../../Button';
import Icon from '../../Icon';

import style from '../styles/index.module.scss';

const OrderingDeliveryVariantsBtn = ({ deliveryVariant = [], setActiveVariantPayments, idEnableBtn }) => {
  return (
    <>
      <div className={style['ordering__button-wrap']}>
        {deliveryVariant.map((el) => {
          return (
          // <GxTooltip
          //   key={v4()}
          //   content="сдесь можно выбрать почтовую службу"
          //   placement="top-start"
          // >
            <Button
              key={el.id}
              id={el.id}
              onClick={setActiveVariantPayments}
              variant="text"
              className={classNames({
                [style['ordering__button']]: true,
                [style['ordering__button--active']]: el.active,
              })}
            >
              {el.title}
              { idEnableBtn === el.id?
                <Icon
                  slot="icon-left"
                  src={statusSend}
                  className="cabinet_orders_details__base_info__icon"
                />
                :null
              }
            </Button>
          // </GxTooltip>
          );
        })}
      </div>
    </>
  );
};

export default React.memo(OrderingDeliveryVariantsBtn);
