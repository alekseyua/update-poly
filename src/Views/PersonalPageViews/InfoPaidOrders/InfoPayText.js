import React from 'react';

import style from './styles/info-pay.module.scss';

const InfoPayText = ({
    children
}) => {

    return (
        <div
            className = { style['info-pay__text'] }
        >{ children }</div>
    )
}

export default InfoPayText;