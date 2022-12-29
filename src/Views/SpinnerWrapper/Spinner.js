import React, { useEffect, useState } from "react";
import { spin } from '../../images';
import Icon from "../Icon";

/**
* @param {
*  sizeHeight - 
*  sizeWidth - 
*  className -
*  clearTime - время показа спинера
*  slot ['icon-right', 'icon-left']
*  bodrad - border-radius(__%)
* }
*/

const Spinner = ({ className = 'spinner', sizeWidth = '50', sizeHeight = '50', slot, bodrad, clearTime = null, ...props }) => {
  
    const [ dataRender, setDataRender] = useState(<Icon
        classname={className}
        width={sizeWidth}
        height={sizeHeight}
        slot={slot}
        src={spin}
        bodrad={bodrad}
        />);
    
    useEffect(()=>{
        let timerTimeOut = null;
        clearTime?
            timerTimeOut = setTimeout(() => {
                setDataRender(<></>)
                clearTimeout(timerTimeOut)
            }, clearTime)
            : null
    },[clearTime])

    return (
        <React.Fragment>
            {
                dataRender
            }
        </React.Fragment>
    )

}

export default Spinner;