import React, { useEffect, useState } from 'react';
import BlockSpinner from '../../../Views/SpinnerWrapper';
import style from './styles/infoBlock.module.scss';

const NoProducts = ({
    children
}) => {
    const [ dataText, setDataText ] = useState(<BlockSpinner.SpinnerCenter>
        <BlockSpinner.Spinner />
    </BlockSpinner.SpinnerCenter>);
    useEffect(()=>{    
        const timerTimeOut = setTimeout(()=>{

            setDataText(
                <div
                className={style['info-block__about-products']}
                >{children}</div>
            )
            clearTimeout(timerTimeOut)
        }, 3000)
    },[])    
    return (
        <React.Fragment>
            {dataText}
        </React.Fragment>

    )
}

export default NoProducts;