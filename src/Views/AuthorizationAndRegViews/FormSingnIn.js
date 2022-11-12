import React from 'react';
import Title from '../Title';
import style from './styles/formSignIn.module.scss';
import Text from '../../helpers/Text';

const FormSingnIn = ({ children }) => {
  return (
    <div className={style['formSignIn__wrapper']}>
      <Title variant={'poppins'}>
        <Text text={'signIn'} />
      </Title>
      <div className={style['formSignIn__wrapper-title-help-text']}>
        <Text text={'reauestDataRegistration'} />
      </div>
      {children}
    </div>
  );
};

export default React.memo(FormSingnIn);
