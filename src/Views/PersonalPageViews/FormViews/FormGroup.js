import React from 'react';

const FormGroup = ({ children, phone,phoneAuth }) => {

  
  const styleFormGroup = () => {
    if(phone){
      return 'cabinet-form__group--phone'
    } 
    if(phoneAuth){
      return 'cabinet-form__group--phone-auth'
    }
    return 'cabinet-form__group'

  }

  return <div className={styleFormGroup()}>{children}</div>;
};
export default React.memo(FormGroup);
