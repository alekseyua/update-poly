import React from 'react';
import style from './styles/index.module.scss';

const WrapperExportCard = ({ children }) => {
  return <div className={style["wrapper__product-export-card"]}>{children}</div>;
};

export default React.memo(WrapperExportCard);
