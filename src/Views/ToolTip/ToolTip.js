import React, { useEffect, useState } from 'react';
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

  useEffect(()=>{
    // getBoundingClientRect
    const toolTip = document.querySelector(`.${style['toolTip__tooltip']}`);
    const boxToolTip = document.querySelector(`.${style['toolTip__tooltip']}`);
    const widthScreen = document.querySelector('body').offsetWidth;

    // console.log({toolTip})
    const boxToolTipWidth = toolTip.clientWidth;
    const boxToolTipHeight = toolTip.clientHeight;
    const bottom = toolTip.getBoundingClientRect().bottom;
    const right = toolTip.getBoundingClientRect().right;
    const left = toolTip.getBoundingClientRect().left;
    const top = toolTip.getBoundingClientRect().top;
    // console.log({top},{right},{bottom},{left}, {boxToolTipWidth}, {boxToolTipHeight})

    if ( Math.sign(left - widthScreen) === -1 ){
      console.log('left - ', left - widthScreen)
      document.querySelector(`.${style['toolTip__tooltip']}`).style.left = `${left - widthScreen}px`
    }

  },[])

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