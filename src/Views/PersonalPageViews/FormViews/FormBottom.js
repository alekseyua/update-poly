import React from 'react';
import Text from '../../../helpers/Text';
import Button from '../../Button';

import style from '../styles/wrapper.module.scss';

const FormBottom = ({ onClickChangePassword, children, phone }) => {

  return (
    <div 
      className={style['cabinet-form__end']}
      style = { {justifyContent: phone? 'flex-end' : 'space-between' } }  
    >
      <div className={style['cabinet-form__end--left']}>
        <Button 
          variant = { "cabinet-linkblue" } 
          onClick = { onClickChangePassword } 
          className = { style['cabinet-form__link--blue'] }
        >
          <Text text = { 'changePhone' } />
        </Button>
      </div>
      <div 
        className={style['cabinet-form__end--right']}
        style = { {display: phone? 'none' : 'block'} }  
      >{children}</div>
    </div>
  );

};
export default React.memo(FormBottom);
