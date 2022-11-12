import React from 'react';
import { ROLE } from '../../../const';

import style from './style/addtocartwrapper.module.scss';

const AddToCartDescriptionContentColor = ({
    color,
}) => {

    return(
        <span>Цвет: { color }</span>         
    )
}

export default AddToCartDescriptionContentColor;
