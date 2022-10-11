import React from 'react';
import classNames from 'classnames';

import style from '../styles/wrapper.module.scss';
import Icon from '../../Icon';

const BalanceItem = ({ greenText = false, value, text, icon }) => {

  const customClassName = classNames({
    [style["cabinet-balance__value"]]: true,
    [style['cabinet-balance__value--greentext']]: greenText,
  });

  return (
    <div className={style["cabinet-balance"]}>
      <div className={style["cabinet-balance__icon"]}>
        <Icon src={icon} alt={text} height={20} width={20}/>
      </div>
      <div className={style["cabinet-balance__desc"]}>
        <div className={customClassName}>{value}</div>
        <div className={style["cabinet-balance__text"]}>{text}</div>
      </div>
    </div>
  );
};

export default React.memo(BalanceItem);
