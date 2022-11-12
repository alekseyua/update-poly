import React from 'react';
import { Link } from 'react-router-dom'
import style from './styles/registrBlock.module.scss'
import Text from '../../helpers/Text';

const RegistrationBlock = ({ to = '#' }) => {
  return (
    <div className={style['registrBlock__wrapper']}>
      <span className={style['registrBlock__wrapper-help_text']}>
        <Text text={'dontHaveAccount'} />
      </span>
      &nbsp;
      <Link className={style['registrBlock__wrapper-link']} to={`/${to}`}>
        <Text text={'register'} />
      </Link>
    </div>
  );
};

export default React.memo(RegistrationBlock);
