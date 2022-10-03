import React from "react";
import Text from "../../../helpers/Text";
import { ROLE } from "../../../const";

import style from './styles/buyoutcondition.module.scss';

const BuyoutCondition = ({
    role,
    prices,
    currency,
    product_rc,
    is_collection,
    product_rcAmount,
}) => {

  return (
    <React.Fragment>
      {/* Условие покупки */}
      <div className={style['prodpage-condition__container']}>
          {
            role === ROLE.DROPSHIPPER && is_collection ? 
            <p className={style['prodpage-condition__title']}>{Text({text: 'general-redeemed'})}</p>
            :null
          }
            <p className={style['prodpage-condition__body']}>
              {
                role === ROLE.WHOLESALE || (role === ROLE.DROPSHIPPER && is_collection)? product_rc : null 
              }
              {
                role === ROLE.WHOLESALE && is_collection ?
                  <span className={style['prodpage-condition__row-price']}>
                    {Text({text: 'row-cost'})}
                    {' '}
                    {(prices.price * product_rcAmount).toFixed(2)}
                    {' '}
                    {currency}
                  </span>
                  :null
              }              
            </p>
            {
              role === ROLE.DROPSHIPPER && is_collection?
                <span className={style['prodpage-condition__context']}>
                  {Text({text: 'condition-drop-collect'})}                  
                </span>
                :null
            }
            {
              role === ROLE.WHOLESALE?
                is_collection?
                  <span className={style['prodpage-condition__context']}>
                    {Text({text: 'condition-wholes-collect'})} <span> {Text({text: 'size-row'})} </span>.
                  </span>              
                    : <span className={style['prodpage-condition__context']}>
                        {Text({text: 'order-the-purchase'}) }{' '} <span> { Text({text: 'general-condition'}) }</span> {Text({text: 'condition-other-user'})}
                      </span>
              :null
            }

          </div>
    </React.Fragment>
  )
}

export default BuyoutCondition;