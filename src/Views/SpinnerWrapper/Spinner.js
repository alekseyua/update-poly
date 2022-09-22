import React from "react";
import { spin } from '../../images';
import Icon from "../Icon";

const Spinner = ({className = 'spinner', sizeWidth = '50', sizeHeight = '50', ...props }) => {
    /**
     * @param {
     *  sizeHeight - 
     *  sizeWidth - 
     *  className -
     * }
     */

    return (
        <>
        <Icon 
            classname={className}
            width={sizeWidth}
            height={sizeHeight}
            src={spin}
        />
        </>
    )
}

export default Spinner;