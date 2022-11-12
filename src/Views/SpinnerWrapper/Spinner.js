import React from "react";
import { spin } from '../../images';
import Icon from "../Icon";

const Spinner = ({className = 'spinner', sizeWidth = '50', sizeHeight = '50', slot, bodrad, ...props }) => {
    /**
     * @param {
     *  sizeHeight - 
     *  sizeWidth - 
     *  className -
     *  slot ['icon-right', 'icon-left']
     *  bodrad - border-radius(__%)
     * }
     */

    return (
        <>
        <Icon 
            classname={className}
            width={sizeWidth}
            height={sizeHeight}
            slot = { slot }
            src={spin}
            bodrad = { bodrad }
        />
        </>
    )
}

export default Spinner;