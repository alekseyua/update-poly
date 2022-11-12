import React from 'react';
import style from '../styles/grid.module.scss';

const BlockAddAddressContainerPhone = ({ children, helpText }) => {

    return <div
        className = {style['block-add-address__conteiner-phone']}
    >{children}
    {helpText? helpText : null}
    </div>
}

export default BlockAddAddressContainerPhone;