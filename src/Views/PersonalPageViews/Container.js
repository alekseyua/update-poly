import React from 'react';
import style from './styles/wrapper.module.scss';

const Container = ({ children }) => {
  return <div className={'cabinet__container'}>{children}</div>;
};

export default React.memo(Container);
