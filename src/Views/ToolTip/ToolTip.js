import React, { useState } from 'react';
import classNames from 'classnames';

import style from './styles/tooltip.module.scss';

/**
 * @param { *  
 * @1) local = {'top-center'} || 
 * 
 * }
 *  @returns 
 */

const ToolTip = ({
  className,
  children,
  content,
  trigger,
  local,
  ...props
}) => {
  const [activeToolTip, setActiveToolTip] = useState(false);

  const handlerChangeState = () => {
    setActiveToolTip(c => !c)
    const timerCloseToolTip = setTimeout(() => {
      setActiveToolTip(false);
      return () => clearTimeout(timerCloseToolTip)
    }, 1500)
  }

  if (trigger = 'hover') {

  }

  const classTooltip = classNames({
    [style['toolTip__tooltip']]: true,
    [style[local]]: !!local,
    [className]: !!className
  })

  return (
    <div
      className={style['toolTip__container']}
    >
      <span
        onClick={handlerChangeState}
        className={classNames({
          [style["toolTip__wrapper-trigger"]]: true,
          [style["toolTip__wrapper-trigger--active"]]: activeToolTip

        })
        }
      >
        <div
          className={classTooltip}
        >
          {content}
        </div>
      </span>
      {children}
    </div>
  );
};

export default ToolTip;