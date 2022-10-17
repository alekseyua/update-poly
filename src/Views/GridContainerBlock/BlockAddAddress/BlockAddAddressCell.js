import React from 'react';
import style from '../styles/grid.module.scss';

const BlockAddAddressCell = ({ children }) => {

    return <div
        className = {style['block-add-address__cell']}
    >{children}</div>
}

export default BlockAddAddressCell;