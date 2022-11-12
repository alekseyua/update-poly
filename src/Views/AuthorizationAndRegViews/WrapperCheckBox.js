import React from 'react';

import style from './styles/registrBlock.module.scss';

const WrapperCheckBox = ({ children }) =>{
    return(
        <div
            className={style['registrBlock__wrapper-checkbox']}
        >
            {
                children 
            }
        </div>
    )
}

export default WrapperCheckBox;