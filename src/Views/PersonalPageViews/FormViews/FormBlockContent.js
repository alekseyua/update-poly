import React from 'react';
import style from '../styles/wrapper.module.scss';

const FormBlockContent = ({ children }) => {
  return <div className={style['cabinet-form-block__content']}>{children}</div>;
};
export default React.memo(FormBlockContent);
