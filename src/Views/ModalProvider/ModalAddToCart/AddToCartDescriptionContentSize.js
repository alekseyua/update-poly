import React from 'react';
import { ROLE } from '../../../const';

import style from './style/addtocartwrapper.module.scss';

const AddToCartDescriptionContentSize = ({
    size,
}) => {

    return(
        <span>Размер: {size}</span>         
    )
}

export default AddToCartDescriptionContentSize;
