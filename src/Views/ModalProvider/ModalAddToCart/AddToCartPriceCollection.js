import React from 'react';

import style from './style/addtocartwrapper.module.scss';

const AddToCartPriceCollection = ({
   price,
   currency
}) => {

    return(
        <div className={style['add-to-cart__price-collection']}>
            {
                (price * product_rcAmount).toFixed(2)
            } 
            { currency }
        </div>
    )
}

export default AddToCartPriceCollection;
