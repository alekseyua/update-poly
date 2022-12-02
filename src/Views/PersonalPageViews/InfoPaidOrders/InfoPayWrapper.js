import React from 'react';

import style from './styles/info-pay.module.scss';

const InfoPayWrapper = ({
    children
}) => {

    return (
        <div
            className = { style['info-pay__wrapper'] }
        >{ children }</div>
    )
}

export default InfoPayWrapper;