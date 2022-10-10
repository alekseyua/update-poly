import React from 'react';
import classNames from 'classnames';
import {statusSend} from '../../../images';

import Button from '../../Button';
import Icon from '../../Icon';

import style from '../styles/index.module.scss';

const OrderingPayButtons = ({ 
  payment_methods = [], 
  total_cost,
  balance,

  setActiveVariantPayments,
}) => {

if (payment_methods.length) {
  return (
    <div className={style['ordering__button-wrap']}>
        {payment_methods.map((el,i) => {
          if (balance >= total_cost){
            if(el.id!==1){
            return (
              <Button
                variant="text"
                key={el.id}
                id={el.id}
                onClick={setActiveVariantPayments}
                className={classNames({
                  [style['ordering__button']]: true,
                  [style[`ordering__button--${i}`]]: true,
                  [style['ordering__button--active']]: true,
                })}
              >
                {el.title}
                
                <Icon
                  slot="icon-left"
                  src={statusSend}
                  className="cabinet_orders_details__base_info__icon"
                />
                </Button>
            );}
          }else{
            if(el.id!==3){
              return (
                <Button
                  variant="text"
                  key={el.id}
                  id={el.id}
                  onClick={setActiveVariantPayments}
                  className={classNames({
                    [style['ordering__button']]: true,
                    [style['ordering__button--active']]: true,
                  })}
                >
                  {el.title}
                  <Icon
                    slot="icon-left"
                    src={statusSend}
                    className="cabinet_orders_details__base_info__icon"
                  />
                </Button>
              );
            }
          }

        })}
      </div>
    );
  } else {
    return null;
  }
};

export default React.memo(OrderingPayButtons);
