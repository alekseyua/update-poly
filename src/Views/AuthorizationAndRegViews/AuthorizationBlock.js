import React from 'react';
import { Link } from 'react-router-dom';
import style from './styles/registrBlock.module.scss';
import Text from '../../helpers/Text';

const AuthorizationBlock = ({ to = '#' }) => {
  return (
    <div className={style['registrBlock__wrapper']}>
      <span className={style['registrBlock__wrapper-help_text']}>
        <Text text={'alreadyHaveAccount'} />
      </span>
      &nbsp;
      <Link className={style['registrBlock__wrapper-link']} to={`/${to}`}>
        <Text text={'authorization'} />
      </Link>
    </div>
  );
};

export default React.memo(AuthorizationBlock);
