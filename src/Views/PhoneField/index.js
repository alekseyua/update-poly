import React from 'react';
import Input from '../Input/Input';
import style from './styles/index.module.scss';

const PhoneField = ({ variant, labelVariant, label, children, helpText = null, ...props }) => {
  return (
    <label className={style[labelVariant]}>
      {/* {label} */}
      <Input 
        label = { label }
        className={style[variant]} 
        {...props}
      
      >
        {children}
      </Input>
      {/* {helpText} */}
    </label>
  );
};

export default React.memo(PhoneField);
