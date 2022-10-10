import React from 'react';
import Text from '../../../helpers/Text';
import Button from '../../Button';
import style from '../styles/wrapper.module.scss';

const FormBottom = ({ onClickChangePassword, children }) => {
  return (
    <div className={style['cabinet-form__end']}>
      <div className={style['cabinet-form__end--left']}>
        <Button 
          variant={"cabinet-linkblue"} 
          onClick={onClickChangePassword} 
          className={style['cabinet-form__link--blue']}
        >
          <Text text={'changePasswor'} />
        </Button>
      </div>
      <div className={style['cabinet-form__end--right']}>{children}</div>
    </div>
  );
};
export default React.memo(FormBottom);
