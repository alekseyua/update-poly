import React from 'react';

const FormGroup = ({ children }) => {
  return <div className={'cabinet-form__group'}>{children}</div>;
};
export default React.memo(FormGroup);
