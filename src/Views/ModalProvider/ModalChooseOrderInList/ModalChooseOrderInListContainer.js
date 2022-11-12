import React from 'react';

import style from './style/modalchooseorderinlist.module.scss';

const ModalChooseOrderInListContainer = ({children}) => {

    return(
        <div
            className={style['modal-choose-order__container']}
        >
            {children}
        </div>
    )
}

export default ModalChooseOrderInListContainer;