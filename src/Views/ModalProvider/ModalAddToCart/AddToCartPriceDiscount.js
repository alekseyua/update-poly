import React from 'react';

import style from './style/addtocartwrapper.module.scss';

const AddToCartPriceDiscount = ({
   old_price,
   currency
}) => {

    return(
        <div className={style['add-to-cart__price-discount']}>
            {old_price.toFixed(2)} {currency}
        </div>
    )
}

export default AddToCartPriceDiscount;
