import React, { useState } from 'react';
import { statusCancel } from '../../images';
import classNames from 'classnames';

import style from './styles/index.module.scss';
import Icon from '../Icon';

const WarningBlock = ({ textWarning, children}) => {

  const [spolerActive, setSpolerActive] = useState(false)
  const heandleClickSpoler = () => {
    setSpolerActive(c=>!c)
  }

  const classContext = classNames({
    [style['warning-block__wrapper-text-content']]: spolerActive,
    [style['warning-block__wrapper-text-content--disable']]: !spolerActive, 
  })
  const classCross = classNames({
    [style['warning-block__catalog-wrapper']]: !spolerActive,
    [style['warning-block__catalog-wrapper--active']]: spolerActive,
  })

  return (
    <div 
      className={classCross}
      onClick={heandleClickSpoler}
      style = {
        { opacity: textWarning? 1 : 0 }
      }
    >
      { children }
      <div className={style["warning-block__arrow-8"]}></div>
      <Icon className={style['warning-block__wrapper-icon']} src={statusCancel} alt={'cansel'} width={20} height={20} />
      <span 
        className={style['warning-block__wrapper-text']}
      >
        <span 
            className={style['warning-block__wrapper-text-btn']}        
        > 
          <div className={style['warning-block__wrapper-text-ellipsis']}>
            {textWarning}
          </div>
          <div className={classContext}>
            {textWarning}
          </div>
        </span>
      </span>
    </div>
  );
};

export default React.memo(WarningBlock);
