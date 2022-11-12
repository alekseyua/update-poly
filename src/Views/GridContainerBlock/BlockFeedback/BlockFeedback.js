import React from 'react';

import style from '../styles/grid.module.scss';

const BlockFeedback = ({ children }) => {
    return <div className={style["block__feedback-content"]}>{children}</div>
}

export default BlockFeedback;