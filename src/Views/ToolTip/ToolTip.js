import React from 'react';
import classNames from 'classnames';

import style from './styles/tooltip.module.scss';


const ToolTip = ({
    className,
    children, 
    content,
    trigger, 
    local, 
    ...props
}) => {
/**
 * @param {
 *  нужна реализация;
 *  1) при наведении
 *  2) при клике
 *  3) ато показ до фокуса
 * }
 *  @returns 
 */

  if(trigger = 'hover'){

  }

  const classTooltip = classNames({
    [style['tooltip__tooltip']]: true,
    [style[local]]: !!local,
    [className]: !!className
  })

  return (
    <div
      className = { style['tooltip__container'] }
    >
      <div 
        className={classTooltip}
      >
        { content }
      </div>
      { children }
    </div>
    // <>
    // </>
  );
};

export default ToolTip;