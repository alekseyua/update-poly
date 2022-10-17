import React from 'react';

import style from '../styles/grid.module.scss';

const BlockMessage = ({ children }) => {
    return <div className={style["block__message-content"]}>{children}</div>
}

export default BlockMessage;