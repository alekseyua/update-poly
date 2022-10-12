import React from 'react';
import classNames from 'classnames';

import style from './styles/form.module.scss';

const Form = ({ 
    variant = null, 
    className = null, 
    children, 
    onSubmit = null, 
    id=null,

}) => {
    
    const dinamicStyle = classNames({
        [style['form']]:true,
        [style[variant]]: !!variant,
        className: !!className
    })

    

    return (
        <form 
            onSubmit={onSubmit}
            className={dinamicStyle}
            id={id}
        >
            {children}
        </form>
    )
}

export default Form;