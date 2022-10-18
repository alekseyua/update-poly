import React from 'react';

const FormGroup = ({ children, phone }) => {

  
  const styleFormGroup = () => {
    if(phone){

      return 'cabinet-form__group--phone'
    } 
    return 'cabinet-form__group'

  }

  return <div className={styleFormGroup()}>{children}</div>;
};
export default React.memo(FormGroup);
