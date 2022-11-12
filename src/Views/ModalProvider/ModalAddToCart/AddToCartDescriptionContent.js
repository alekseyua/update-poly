import React from 'react';
import { ROLE } from '../../../const';

import style from './style/addtocartwrapper.module.scss';

const AddToCartDescriptionContent = ({
    children,
}) => {

    return(
        <div className={style['add-to-cart__description-content']}>        
            { children }
        </div>
    )
}

export default AddToCartDescriptionContent;
