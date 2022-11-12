import React from 'react';
import style from '../styles/grid.module.scss';

const BlockAddAddressContainer = ({ children }) => {

    return <div
        className = {style['block-add-address__conteiner']}
    >{children}</div>
}

export default BlockAddAddressContainer;