import React from 'react';

import style from './style/addtocartwrapper.module.scss';

const AddToCartDescriptionImage = ({
    image,

}) => {

    return(
        <img
            className={style['add-to-cart__description-image']}
            src={image}
            alt="preview image add to cart"
        />
    )
}

export default AddToCartDescriptionImage;
