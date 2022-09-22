import React from 'react';
import classNames from 'classnames';

import style from './icon.module.scss';

const Icon = ({invert = '0%', onClick, className, src, width='25', height='25', filter, ...props}) => {
    const  styleIcons = classNames({
        [style['icons']]: true,
        [className] : !!className
    })


// console.log('invert === ', invert)
// console.log('src = ', src, ' width = ', width)
    return(
        <div 
            onClick={onClick}
            className={styleIcons}
            style={{
                backgroundImage: `url(${src})`,
                width: `${width}px`,
                height:`${height}px`,
                filter: filter
            }}
            
        >
            {/* <object 
                data={props.src} type="image/svg+xml"
                style={
                    {
                        filter: `invert(${invert})`
                    }
                }
            >

            </object> */}
            {/* <embed src={props.src} type="image/svg+xml" /> */}
        </div>

    )
}

export default Icon;

