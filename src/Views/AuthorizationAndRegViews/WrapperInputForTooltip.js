import React, { useState } from 'react';
import TooltipInInput from './TooltipInInput'
import style from './styles/toolTip.module.scss';
import classNames from 'classnames';

const WrapperInputForTooltip = ({ children, local='top', content = "", trigger = "click" }) => {
  const [ activeToolTip, setActiveToolTip ] = useState(false);
  const handlerChangeState = () => {
    setActiveToolTip(c=>!c)
    const timerCloseToolTip = setTimeout(()=>{
      setActiveToolTip(false);      
      return ()=>clearTimeout(timerCloseToolTip)
    },1500)
  }
  return (
    <div className={style["toolTip__wrapper"]}>
      <span 
        onClick={handlerChangeState}
        className={classNames({
          [style["toolTip__wrapper-trigger"]]: true,
          [style["toolTip__wrapper-trigger--active"]]: activeToolTip
          
        })
      }
      >
        <TooltipInInput
          trigger={trigger}
          content={content}
          local={local}
          >
        </TooltipInInput>
      </span>
        {children}
    </div>
  );
};
export default React.memo(WrapperInputForTooltip);
