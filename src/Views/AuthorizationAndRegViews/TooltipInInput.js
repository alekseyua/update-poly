import React from 'react';
import style from './styles/tooltip.module.scss';
import classNames from 'classnames';
const TooltipInInput = ({ content, children, trigger, local, ...props }) => {

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
    [style['toolTip__tooltip']]: true,
    [style[local]]: !!local
  })

  return (
    <div 
      className={classTooltip}
      style={{
        
      }} 
    >
      {content}
      {/* {children} */}
    </div>
    // <>
    // </>
  );
};
export default React.memo(TooltipInInput);
