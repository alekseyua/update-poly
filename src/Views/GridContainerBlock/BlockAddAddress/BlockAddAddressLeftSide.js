import React from 'react';
import style from '../styles/grid.module.scss';

const BlockAddAddressLeftSide = ({ children }) => {

    return <div
        className = {style['block-add-address__left-side']}
    >{children}</div>
}

export default BlockAddAddressLeftSide;