import React from 'react';
import style from './style/addtocartwrapper.module.scss';

const AddToCartPriceContainer = ({
    children,

}) => {

    return(
        <div className={style['add-to-cart__price-container']}>
            {children}
        </div>
    )
}

export default AddToCartPriceContainer;
