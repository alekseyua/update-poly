import React from 'react';
import style from '../styles/grid.module.scss';

const BlockAddAddressAdditionalInfo = ({ children }) => {

    return <div
        className = { style['block-add-address__additional-info'] }
    >{ children }</div>
}

export default BlockAddAddressAdditionalInfo;