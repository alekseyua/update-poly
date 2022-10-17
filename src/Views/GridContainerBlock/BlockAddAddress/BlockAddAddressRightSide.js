import React from 'react';
import style from '../styles/grid.module.scss';

const BlockAddAddressRightSide = ({ children }) => {

    return <div
        className = {style['block-add-address__right-side']}
    >{children}</div>
}

export default BlockAddAddressRightSide;