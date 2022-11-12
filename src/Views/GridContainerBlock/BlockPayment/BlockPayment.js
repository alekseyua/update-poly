import React from 'react';

import style from '../styles/grid.module.scss';

const BlockPayment = ({ children }) => {
    return <div className={style["block__payment-content"]}>{children}</div>
}

export default BlockPayment;