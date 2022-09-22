import React from 'react';
import style from './styles/personalInfo.module.scss';
import { initialsName } from '../../helpers/helpers';

const PersonalInfo = ({ first_name, last_name, titleRole }) => {
  return (
    <div className={style['personalInfo__wrapper']}>
      <div className={style['personalInfo__wrapper-ellipse']}>{initialsName(first_name, last_name)}</div>
      <div className={style['personalInfo__wrapper-name_and_role']}>
        <p className={style['personalInfo__wrapper-name_and_role-name']}>
          {first_name}
          <br />
          {last_name}
          <br />
          <span className={style['personalInfo__wrapper-name_and_role-role']}>{titleRole}</span>
        </p>
      </div>
    </div>
  );
};

export default React.memo(PersonalInfo);
