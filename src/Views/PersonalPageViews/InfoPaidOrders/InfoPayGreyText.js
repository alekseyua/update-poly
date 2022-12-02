import React from 'react';

import style from './styles/info-pay.module.scss';

const InfoPayGreyText = ({
    children
}) => {

    return (
        <div
            className = { style['info-pay__text--grey'] }
        >{ children }</div>
    )
}

export default InfoPayGreyText;