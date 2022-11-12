import React from "react";
import { ROLE } from "../../../const";
import Text from "../../../helpers/Text";
import classNames from "classnames";

import style from './styles/pricescontainer.module.scss';

const PricesContainer = ({
    role,
    in_cart_count,
    recommended_price,
    currency,
    prices
}) => {

    return(
        <div className={style['prodpage-price__container']}>
        <p
          className={classNames({
            [style['prodpage-price__mainprice']]: true,
            sceleton: !prices.price,
            min_block: !prices.price,
          })}
        >
            {
                    prices.price ?
                        role === ROLE.RETAIL?
                            in_cart_count >= 5?
                                prices.more_5_item_price
                                : in_cart_count >= 3?
                                    prices.more_3_item_price
                                    : prices.price
                        : prices.price 
                    : null    
            }
            {' '}
            {
                prices.price? currency : null
            }
        </p>
        <div className={style['prodpage-price__recommended']}>
          {role !== ROLE.RETAIL && recommended_price ? (
            <>
              <p>{Text({text: 'recom-price'})}</p>
              <p>
                <span>
                  {recommended_price}{' '}{currency}
                </span>
              </p>
            </>
          ) : null}
        </div>
      </div>
    )
}

export default PricesContainer;