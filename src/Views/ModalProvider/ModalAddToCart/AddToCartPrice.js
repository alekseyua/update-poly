import React from 'react';

import style from './style/addtocartwrapper.module.scss';

const AddToCartPrice = ({
   price,
   currency
}) => {

    return(
        <span className={style['add-to-cart__price']}>
                {price.toFixed(2)} {currency}
        </span>
    )
}

export default AddToCartPrice;
