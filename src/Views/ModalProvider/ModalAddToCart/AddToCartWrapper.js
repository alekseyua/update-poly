import React from 'react';
import style from './style/addtocartwrapper.module.scss';

const AddToCartWrapper = ({
    children,

}) => {

    return(
        <div className={style['add-to-cart__wrapper']}>
            {children}
        </div>
    )
}

export default AddToCartWrapper;
