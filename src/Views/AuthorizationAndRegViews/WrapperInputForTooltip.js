import React from 'react';
import TooltipInInput from './TooltipInInput'
import style from './styles/toolTip.module.scss';

const WrapperInputForTooltip = ({ children, local='top', content = "", trigger = "click" }) => {
  return (
    <div className={style["toolTip__wrapper"]}>
      <span className={style["toolTip__wrapper-trigger"]}>
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
