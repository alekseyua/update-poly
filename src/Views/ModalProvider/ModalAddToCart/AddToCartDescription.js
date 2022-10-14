import React from 'react';

import style from './style/addtocartwrapper.module.scss';

const AddToCartDescription = ({
    children,

}) => {

    return(
        <div className={style['add-to-cart__description']}>
            {children}
        </div>
    )
}

export default AddToCartDescription;
