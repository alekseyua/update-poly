import React from 'react';
import style from './style/addtocartwrapper.module.scss';

const AddToCartContainer = ({
    children,

}) => {

    return(
        <div className={style['add-to-cart__container']}>
            {children}
        </div>
    )
}

export default AddToCartContainer;
