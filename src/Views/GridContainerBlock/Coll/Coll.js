import React from 'react';
import style from '../styles/grid.module.scss';
import classNames from 'classnames';

const Coll = ({ children, className, ...props }) => {
  return (
    <div 
      className={classNames({
        [style['grid__coll']]: true,
        [className]: !!className        
      })    }
    >
      {children}
    </div>
  );
};

export default Coll;
