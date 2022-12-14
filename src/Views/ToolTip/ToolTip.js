import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import style from './styles/tooltip.module.scss';

/**
 * @param { *  
 * @1) local = {'top-center'} || 
 *  2) content
 *  3) trigger
 *  4) 
 * }
 *  @returns 
 */

const ToolTip = ({
  className,
  active = false,
  addClass,
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

  useEffect(()=>{
    // getBoundingClientRect
    const toolTip = document.querySelector(`.${style['toolTip__tooltip']}`);
    const boxToolTip = document.querySelector(`.${style['toolTip__tooltip']}`);
    const widthScreen = document.querySelector('body').offsetWidth;
    const boxToolTipWidth = toolTip.clientWidth;
    const boxToolTipHeight = toolTip.clientHeight;
    const bottom = toolTip.getBoundingClientRect().bottom;
    const right = toolTip.getBoundingClientRect().right;
    const left = toolTip.getBoundingClientRect().left;
    const top = toolTip.getBoundingClientRect().top;
    if ( widthScreen > 540 ){
      document.querySelector(`.${style['toolTip__tooltip']}`).style.left = `-${boxToolTipWidth}px`
    }

  },[])

  const classTooltip = classNames({
    [style['toolTip__tooltip']]: true,
    [style[local]]: !!local,
    [style[addClass]]: !!addClass,
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
          [style["toolTip__wrapper-trigger--active"]]: activeToolTip,
          [style["toolTip__wrapper-trigger--disable"]]: active
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