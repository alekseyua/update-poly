import React from 'react';
import style from './spinner.module.scss';

const Spinner = ({ slot }) => {
  return (
    <div className={style["wrapper"]} slot={slot}>
      <span className={style["spinner"]}></span>
    </div>
  );
};
export default React.memo(Spinner);
