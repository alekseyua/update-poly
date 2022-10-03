import React from 'react';
import classNames from 'classnames';

import style from './icon.module.scss';


        /**
         * @param {
         * pointerEvents - действие кликабельности по иконе
         * width - ширина иконки (изображения)
         * heigth - высота иконки (изображения)
         * invert - в процентах, инвинтирование изображения
         * }
         */


const Icon = ({
    invert = '0%', 
    onClick, 
    className,
    slot,
    ref, 
    src, 
    width='25', 
    height='25', 
    filter, 
    pointerEvents,
    ...props}) => {

    const  styleIcons = classNames({
        [style['icons']]: true,
        [style[slot]]: !!slot,
        [className] : !!className
    })

    return(
        <div 
            ref={ref}
            onClick={onClick}
            className={styleIcons}
            style={{
                backgroundImage: `url(${src})`,
                width: `${width}px`,
                height:`${height}px`,
                filter: `invert(${invert})`,
                pointerEvents: pointerEvents
            }}            
        >
        </div>
    )
}

export default Icon;

