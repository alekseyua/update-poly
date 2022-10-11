import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../Icon';

import style from './styles/wrapper.module.scss'

const WarningHelpText = ({ icon, wraningText = 'text', linkText = 'link', to = '#' }) => {
  return (
    <div className={style["cabinet-warning"]}>
      <div className={style["cabinet-warning__icon"]}>
        <Icon src={icon} alt="" height={20} width={20}/>
      </div>
      <div className={style["cabinet-warning__desc"]}>
        <div className={style["cabinet-warning__text"]}>{wraningText}</div>
        <Link to={to}>{linkText}</Link>
      </div>
    </div>
  );
};
export default React.memo(WarningHelpText);
