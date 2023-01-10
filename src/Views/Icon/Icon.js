import React from 'react';
import classNames from 'classnames';

import style from './icon.module.scss';


        /**
         * @param {
         * pointerEvents - действие кликабельности по иконе
         * width - ширина иконки (изображения)
         * height - высота иконки (изображения)
         * invert - в процентах, инвинтирование изображения
         * }
         */


const Icon = ({
    invert = '0%', 
    opacity = '1',
    brightness = '1',
    fill = '',
    onClick, 
    className,
    slot,
    bodrad,
    id,
    ref, 
    src, 
    width, 
    height, 
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
            id = { id }
            ref={ ref }
            onClick={ onClick }
            className={ styleIcons }
            style={{
                backgroundImage: `url(${src})`,
                width: `${width}px`,
                height:`${height}px`,
                filter: `invert(${invert}) opacity(${opacity}) brightness(${brightness})`,
                pointerEvents: pointerEvents,
                borderRadius: `${bodrad}%`,
                fill: `${fill}`
            }}            
        >
        </div>
    )
}

export default Icon;

