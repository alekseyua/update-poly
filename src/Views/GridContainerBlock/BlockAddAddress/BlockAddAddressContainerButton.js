import React from 'react';
import style from '../styles/grid.module.scss';

const BlockAddAddressContainerButton = ({ children }) => {

    return <div
        className = {style['block-add-address__container-button']}
    >{children}</div>
}

export default BlockAddAddressContainerButton;